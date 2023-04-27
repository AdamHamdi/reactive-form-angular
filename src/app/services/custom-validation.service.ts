import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {
   

  constructor( private http:HttpClient) { }
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
  //This goes into service
validateUsernameNotTaken(control: AbstractControl) {
  return this.checkUsernameNotTaken(control.value).pipe(
    map((res: any) => {
      return res ? null : { usernameTaken: true };
    })
  );
}

//Fake API call -- You can have this in another service
checkUsernameNotTaken(username: string): Observable<boolean>  {
  return this.http.get<any[]>("assets/fakedb.json").pipe(
    map((usernameList)=>
      usernameList.filter(user => user.username === username)
    ),
    map(users => !users.length)
  );
}
}
