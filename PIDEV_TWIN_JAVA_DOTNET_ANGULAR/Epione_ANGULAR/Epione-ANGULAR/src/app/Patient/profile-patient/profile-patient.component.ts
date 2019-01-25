import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { patient } from 'src/app/entities/patient';
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from 'src/app/user/register/MatchPassword';
import { last } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-profile-patient',
  templateUrl: './profile-patient.component.html',
  styleUrls: ['./profile-patient.component.css']
})
export class ProfilePatientComponent implements OnInit {

  constructor(private fb:FormBuilder, private patientService : UserService) { }

  msgError = "" ;
  msgSuccess = ""  ;
  connectedPatient : patient ; 
  listeComments = [] ; 
  listeRatings = [] ; 
  listeMessages = []  ;
  showNoCommentDiv : boolean = true ; 
  showNoRatesDiv : boolean = true ;
  showDiv2 : boolean = true ; 
  countMsgP : number ; 
  imageURL : string = "" ;
  fileToUpload : File = null ; 

  ngOnInit() { 
    this.patientService.getPatientById().subscribe((Data)=>{
      this.connectedPatient = Data ; 
    })
    this.patientService.getCommentPatient(localStorage.getItem('userId')).subscribe((Data)=>{
      console.log("dataaaaa"+Data) ;
      if(Data){
        this.listeComments = Data ; 
      }else {
        this.showNoCommentDiv = false ; 
      }
    })
    this.patientService.getAllRatesByPatient(localStorage.getItem('userId')).subscribe((Data)=>{
      if(Data){
      this.listeRatings = Data ; }
      else this.showNoRatesDiv = false ; 
    })
    this.patientService.getPatientMessages().subscribe((Data)=>{
      this.listeMessages = Data ; 
      console.log("liste messages = "+this.listeMessages) ;
    })

    this.patientService.getCountMessagesPatient().subscribe((Data)=>{
      if(Data){
      this.countMsgP = Data ; }
      if(Data==0){
        this.countMsgP = 0 ; 
      }
    })
  }

  form = this.fb.group({
    email : ['', Validators.required]  ,
    firstName : ['',Validators.required] ,
    lastName : ['',Validators.required] ,
    password : ['',Validators.required] ,
    confirmPassword : [''],
    phoneNumber : ['',Validators.required],
    codePostal : [''] ,
    numAppart : [''],
    rue : [''] ,
    ville : [''] 
  },{validator: PasswordValidation.MatchPassword })


  handleFileInput(file : FileList){
    this.fileToUpload = file.item(0) ; 
    var reader = new FileReader() ; 
    reader.onload = (event:any) => {
      this.imageURL = event.target.result ; 
      console.log("imageeeeeeeeeeeeeeeee"+event.target.result);
      
    }
    reader.readAsDataURL(this.fileToUpload) ;
    console.log("fileeeeeeeee"+this.fileToUpload);
  }

  showSection1(){
    this.showDiv2 = false ; 
  }

  onSubmit(){

    let email = "" ; 
    if(this.form.get('email').value)
    { email =  this.form.get('email').value ;}
    else {
    email = this.connectedPatient.email ; 
    this.msgError = "Invalid email" ;
    }
    let firstName = "" ; 
    if(this.form.get('firstName').value){
    firstName =  this.form.get('firstName').value ;}
    else {
    firstName =  this.connectedPatient.firstName ; 
    this.msgError = "complete your info" ;
    }
    let lastName = "" ; 
    if( this.form.get('lastName').value){
      lastName = this.form.get('lastName').value  ; 
    }else {
      lastName = this.connectedPatient.lastName ; 
      this.msgError = "complete your info" ;
    }
    let password = "" ; 
    if(  this.form.get('password').value  ) {
      password = this.form.get('password').value  ; 
    }else  {
      password = this.connectedPatient.password ; 
      this.msgError = "Invalid password" ; 
    }
    let phoneNumber = "" ; 
    if(this.form.get('phoneNumber').value ){
      phoneNumber = this.form.get('phoneNumber').value ; 
    }else {
      phoneNumber =  this.connectedPatient.phoneNumber ; 
      this.msgError = "complete your info" ;
    }
    let codePostal = "" ; 
    if(this.form.get('codePostal').value ){
      codePostal = this.form.get('codePostal').value ; 
    } else 
    {
      codePostal = this.connectedPatient.adresse.codePostal ; 
    }
    let numAppart = "" ;
    if( this.form.get('numAppart').value){
      numAppart =  this.form.get('numAppart').value ; 
    }else {
      numAppart = this.connectedPatient.adresse.numAppart ; 
    }
    let rue =  "";
    if(this.form.get('rue').value  ){
      rue = this.form.get('rue').value  ; 
    }else {
      rue = this.connectedPatient.adresse.rue ; 
    }
    let ville =  "" ;
    if(this.form.get('ville').value){
      ville = this.form.get('ville').value ; 
    }else {
      ville = this.connectedPatient.adresse.ville ; 
    }

    

    let patientUpdated : any = {
      "id" : localStorage.getItem('userId') ,
      "email" : email , 
      "firstName" : firstName ,
      "lastName" : lastName , 
      "password" : password, 
      "phoneNumber" : phoneNumber ,
      "image" : this.fileToUpload.name ,
      "adresse" : {
        "codePostal" : codePostal , 
        "numAppart" : numAppart , 
        "rue" : rue , 
        "ville" : ville
      }

    } ; 
    this.patientService.updateProfilePatient(patientUpdated).subscribe((Data)=>{
       if(Data['error']=="phone number must not be null"){
          this.msgError = "Invalid phone number" ; 
       }
       if(Data['error']=="password validator"){
        this.msgError = "Invalid password" ; 
        }
         if(Data['error']=="lastName not null"){
      this.msgError = "complete your info" ; 
        } 
         if(Data['error']=="firstName not null"){
        this.msgError = "complete your info" ; 
         } if(Data['error']=="email validator"){
          this.msgError = "Invalid email" ; 
           }if(Data['success']=="patient updated"){
            this.msgSuccess = "Your profile has been updated successfully" ; 
           }
    }) 
  }

}
