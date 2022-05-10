import { AbstractControl } from '@angular/forms';

export function ArrayIsInclude(arr: any[]){
  return (control: AbstractControl) => {
    if (arr.indexOf(control.value) !== -1 ){
        return { arrayIsInclude: true };
    }
    return null;
  }
}
