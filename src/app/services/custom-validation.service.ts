import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  constructor() { }
  passwordMatchValidator(password: string, confirmPassword: string){
    return (formGroup : FormGroup):any =>{
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl =formGroup.controls[confirmPassword];

      if(!password || !confirmPassword){
        return null;
      }
      if(confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMisMatch']){
        return null;
      }
      if(passwordControl.value !== confirmPasswordControl.value){
        confirmPasswordControl.setErrors({passwordMisMatch : true});
      }else{
        confirmPasswordControl.setErrors(null)
      }
    }
  }
}
