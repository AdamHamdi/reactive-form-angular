import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidationService } from '../services/custom-validation.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

// username = new FormControl("");
userForm = this.fb.group({
  userName: ['',[Validators.required, Validators.minLength(3)]],
  password: ['',Validators.required],
  confirmPassword: ['',Validators.required],
  address : this.fb.group({
    street: [''],
    city: [''],
    state: [''],
    zip:['']
  })
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
clear(){
 this.userForm.reset()
  //this.username.setValue("");
}
onSubmit(){
  console.log(this.userForm.value)
}
}
