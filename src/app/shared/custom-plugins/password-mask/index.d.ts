interface INetworkRequestResponse {
    body?: any;
    method: string;
    headers: object;
}
export default class LogrocketFuzzySearch {
    static setup(fields: string[]): {
        requestSanitizer: (request: INetworkRequestResponse) => any;
        responseSanitizer: (reponse: INetworkRequestResponse) => any;
    };
    fields: string[];
    constructor(privateFields: string[]);
    requestSanitizer(request: INetworkRequestResponse): object | any;
    responseSanitizer(reponse: INetworkRequestResponse): object | any;
    private _networkHandler;
    private _searchBody;
    private _mask;
    private _match;
}
export {};
