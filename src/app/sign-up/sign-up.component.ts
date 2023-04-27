import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { CustomValidationService } from '../services/custom-validation.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

// username = new FormControl("");
userForm = this.fb.group({
  userName: ['',[Validators.required, Validators.minLength(3)],
  this.customValidator.validateUsernameNotTaken.bind(this.customValidator)],
  password: ['',Validators.required],
  confirmPassword: ['',Validators.required],
  address : this.fb.group({
    street: ['',Validators.required],
    city: ['',Validators.required],
    state: [''],
    zip:['',Validators.required],
  })
  ,
  daysAvailable: this.fb.array([this.fb.control("")])
},{
  validator: this.customValidator.passwordMatchValidator('password','confirmPassword')
})
stateOptions: string[]=["PA","OH","MI"]

userAddressInfo: any={
  street: "1234 Main Street",
  city:"My City",
  state: this.stateOptions[0],
  zip:"12345"
}
  constructor( private fb:FormBuilder, private customValidator:CustomValidationService) { }

  ngOnInit(): void {
    this.autoFillAddress
   
    
  }
  autoFillAddress(){
    this.userForm.patchValue({
      address:{
        street:this.userAddressInfo.street,
        city: this.userAddressInfo.city,
        state: this.userAddressInfo.state,
        zip:this.userAddressInfo.zip
      }
    })
  }
  addDay(){
    this.daysAvailable.push(this.fb.control(''))
  }
  get daysAvailable(){
    return this.userForm.get('daysAvailable') as FormArray
  }
  get userName(){
    return this.userForm.get('userName')
  }
  get password(){
    return this.userForm.get('password')
  }
  get confirmpassword(){
    return this.userForm.get('confirmPassword')
  }
clear(){
 this.userForm.reset()
  //this.username.setValue("");
}
onSubmit(){
  console.log(this.userForm.value)
}
}
