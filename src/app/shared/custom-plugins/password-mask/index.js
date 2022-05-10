(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.logrocketFuzzySearchSanitizer = factory());
  }(this, function () { 'use strict';

    /**
     * Created by alexey2baranov on 28.01.17.
     */
    /*
     An extraction of the deparam method from Ben Alman's jQuery BBQ
     http://benalman.com/projects/jquery-bbq-plugin/
     */

    var deparam=function (params, coerce) {
      // console.log(params)
      var obj = {},
        coerce_types = {'true': !0, 'false': !1, 'null': null};

      // Iterate over all name=value pairs.
      params.replace(/\+/g, ' ').split('&').forEach(function (v, j) {
        var param = v.split('='),
          key = decodeURIComponent(param[0]),
          val,
          cur = obj,
          i = 0,

          // If key is more complex than 'foo', like 'a[]' or 'a[b][c]', split it
          // into its component parts.
          keys = key.split(']['),
          keys_last = keys.length - 1;

        // If the first keys part contains [ and the last ends with ], then []
        // are correctly balanced.
        if (/\[/.test(keys[0]) && /\]$/.test(keys[keys_last])) {
          // Remove the trailing ] from the last keys part.
          keys[keys_last] = keys[keys_last].replace(/\]$/, '');

          // Split first keys part into two parts on the [ and add them back onto
          // the beginning of the keys array.
          keys = keys.shift().split('[').concat(keys);

          keys_last = keys.length - 1;
        } else {
          // Basic 'foo' style key.
          keys_last = 0;
        }

        // Are we dealing with a name=value pair, or just a name?
        if (param.length === 2) {
          val = decodeURIComponent(param[1]);

          // Coerce values.
          if (coerce) {
            val = val && !isNaN(val) ? +val              // number
              : val === 'undefined' ? undefined         // undefined
                : coerce_types[val] !== undefined ? coerce_types[val] // true, false, null
                  : val;                                                // string
          }

          if (keys_last) {
            // Complex key, build deep object structure based on a few rules:
            // * The 'cur' pointer starts at the object top-level.
            // * [] = array push (n is set to array length), [n] = array if n is
            //   numeric, otherwise object.
            // * If at the last keys part, set the value.
            // * For each keys part, if the current level is undefined create an
            //   object or array based on the type of the next keys part.
            // * Move the 'cur' pointer to the next level.
            // * Rinse & repeat.
            for (; i <= keys_last; i++) {
              key = keys[i] === '' ? cur.length : keys[i];
              cur = cur[key] = i < keys_last
                ? cur[key] || (keys[i + 1] && isNaN(keys[i + 1]) ? {} : [])
                : val;
            }

          } else {
            // Simple key, even simpler rules, since only scalars and shallow
            // arrays are allowed.

            if (typeof obj[key]=="array") {
              // val is already an array, so push on the next value.
              obj[key].push(val);

            } else if (obj[key] !== undefined) {
              // val isn't an array, but since a second value has been specified,
              // convert val into an array.
              obj[key] = [obj[key], val];

            } else {
              // val is a scalar.
              obj[key] = val;
            }
          }

        } else if (key) {
          // No value was defined, so set something meaningful.
          obj[key] = coerce
            ? undefined
            : '';
        }
      });

      return obj;
    };

    var LogrocketFuzzySearch = /** @class */ (function () {
        function LogrocketFuzzySearch(privateFields) {
            this.fields = [];
            this.fields = privateFields;
        }
        LogrocketFuzzySearch.setup = function (fields) {
            var instance = new LogrocketFuzzySearch(fields);
            return {
                requestSanitizer: instance.requestSanitizer.bind(instance),
                responseSanitizer: instance.responseSanitizer.bind(instance),
            };
        };
        LogrocketFuzzySearch.prototype.requestSanitizer = function (request) {
            // avoid parsing GET requests as there will be no body
            if (request.method === 'GET') {
                return request;
            }
            return this._networkHandler(request);
        };
        LogrocketFuzzySearch.prototype.responseSanitizer = function (reponse) {
            return this._networkHandler(reponse);
        };
        LogrocketFuzzySearch.prototype._networkHandler = function (networkRequestReponse) {
            var body = networkRequestReponse.body, headers = networkRequestReponse.headers;
            var requestContentType = headers && (headers['Content-Type'] || '');
            var isUrlEncodedRequest = requestContentType.includes('form-urlencoded');
            var parsedBody;
            try {
                parsedBody = isUrlEncodedRequest ? deparam(body) : JSON.parse(body);
                this._searchBody(parsedBody);
            }
            catch (error) {
                return networkRequestReponse;
            }
            networkRequestReponse.body = parsedBody;
            return networkRequestReponse;
        };
        LogrocketFuzzySearch.prototype._searchBody = function (body) {
            var _this = this;
            if (body === void 0) { body = {}; }
            // iterate over collection of objects ex. [{}, ...]
            if (body && body.constructor === Array) {
                body.forEach(function (item) { return _this._searchBody(item); });
            }
            else {
                for (var key in body) {
                    if (body.hasOwnProperty(key)) {
                        var keyName = body[key];
                        /*
                          Objects with the following shape:
                            {
                              type: 'email',
                              value: 'secret@ex.com'
                            }
                          where type/value keynames are generic and instead
                          the value matching the type keyname should be masked.
                        */
                        var isTypeValuePair = key === 'type' && 'value' in body;
                        if (typeof keyName === 'object') {
                            if (!isTypeValuePair) {
                                this._searchBody(keyName);
                            }
                        }
                        if (isTypeValuePair) {
                            this._mask(body, body.type, 'value');
                        }
                        else {
                            this._mask(body, key);
                        }
                    }
                }
            }
        };
        LogrocketFuzzySearch.prototype._mask = function (body, searchKeyName, maskKeyName) {
            maskKeyName = maskKeyName || searchKeyName;
            var isSensitiveFieldName = this._match(searchKeyName);
            if (isSensitiveFieldName) {
                body[maskKeyName] = '*';
            }
        };
        LogrocketFuzzySearch.prototype._match = function (keyName) {
            if (keyName === void 0) { keyName = ''; }
            var fields = this.fields;
            var normalizedKeyName = keyName.toLowerCase();
            return fields.some(function (field) { return normalizedKeyName.indexOf(field.toLowerCase()) > -1; });
        };
        return LogrocketFuzzySearch;
    }());

    return LogrocketFuzzySearch;

  }));
