import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { doctor } from 'src/app/entities/doctor';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-doctor',
  templateUrl: './contact-doctor.component.html',
  styleUrls: ['./contact-doctor.component.css']
})
export class ContactDoctorComponent implements OnInit {

  constructor(private fb:FormBuilder,private route:ActivatedRoute, private doctorService : UserService) { }

  DoctorId : number ; 
  docteur : doctor ; 
  form = this.fb.group({
    content : ['',Validators.required]  })
  msgError = "" ; 
  msgSuccess = "" ; 



  ngOnInit() {
    this.route.params.subscribe(params => {
      this.DoctorId = params['param'] ; 
    })
    this.doctorService.getSingleDoctor(this.DoctorId).subscribe((Data)=>{
      this.docteur = Data ; 
    })
  }

  OnSubmit(){
    let content = this.form.get('content').value ; 
    let msg : any = {
      "content" : content 
    }
    this.doctorService.sendMessageDoctor(this.DoctorId,msg).subscribe((Data)=>{
      
      if(Data['success']=="envoi message"&&content){
        this.msgSuccess = "Your message has been sent successfully" ; 
      }
      else if(!content){
        this.msgError = "You should type a message first" ; 
      } else {
        this.msgError = "Error encoutered, please try again" ; 
      }
    })
  }

}
