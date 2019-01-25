import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-doctor',
  templateUrl: './login-doctor.component.html',
  styleUrls: ['./login-doctor.component.css']
})
export class LoginDoctorComponent implements OnInit {
  ErrorMsg="" ;
  passwordType : string = 'password' ; 
  passwordSeen : boolean = false ; 
  icone : string = 'icon-eye' ; 

  constructor(private fb:FormBuilder , private userService:UserService, private router : Router) { }

  form = this.fb.group({
    email : ['',Validators.required ] ,
    password: ['', Validators.required] 
  })

  togglePassword(){
    if(this.passwordSeen){
      this.passwordSeen = false ; 
    this.passwordType = 'password' ;
    this.icone = 'icon-eye' ;  
  } else {
    this.passwordSeen = true ; 
    this.passwordType = 'text' ; 
    this.icone = 'icon-eye-off' ; 
  }
  }

  
  user : Object ;
  ngOnInit() {
    
  }

  OnSubmit()
  {
    let email =  this.form.get('email').value ;
    let password = this.form.get('password').value;
    this.userService.LoginDoctor(email,password).subscribe( 
      (Data) => {
        if(Data['result']=="Verifier vos donnees"){
          this.ErrorMsg="Incorrect! Please check your informations" ;
        } 
          else {
            let id=Data['id'];
            localStorage.setItem('userId',id);
            localStorage.setItem('role','doctor');
          this.router.navigate(['doctor/homeDoctor']) ;
          console.log(localStorage.getItem('role')+' / '+localStorage.getItem('userId')) ;

        }
      }
    )
   
  }

}