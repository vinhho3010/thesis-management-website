import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
    /**
   * Support handle check the same password and confirm password
   * @param control is AbstractControl that is represent for a formGroup which is contain password and confirm password
   * @returns mismatch true if password and confirm password are not same and return null if they are same
   */
export const passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if( password?.value === confirmPassword?.value){
      if(confirmPassword?.errors?.['mismatch']){
        confirmPassword?.setErrors(null);
      }
   return null;
  } else {
    confirmPassword?.setErrors({'mismatch': true});
    return {mismatch: true};
  }
};
