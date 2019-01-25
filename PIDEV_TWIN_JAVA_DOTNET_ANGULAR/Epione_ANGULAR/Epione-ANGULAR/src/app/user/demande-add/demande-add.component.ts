import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DoctolibServicesService } from 'src/app/services/doctolib-services.service';
import { demande } from '../../entities/demande';

@Component({
  selector: 'app-demande-add',
  templateUrl: './demande-add.component.html',
  styleUrls: ['./demande-add.component.css']
})
export class DemandeAddComponent implements OnInit {

  Added=false ;
  demande : demande ;
  constructor(private fb:FormBuilder , private serviceDoctolib:DoctolibServicesService ) { }

  formDemande = this.fb.group({
    firstName : ['',Validators.required] ,
    lastName: ['',Validators.required]  ,
    email: ['',Validators.compose(
      [Validators.email, Validators.required])] ,
    city: ['',Validators.required] , 
    speciality: ['',Validators.required]

  })
  ngOnInit() {
  }

  OnSubmit()
  {
    let firstName = this.formDemande.get('firstName').value ;
    let lastName = this.formDemande.get('lastName').value;
    let email = this.formDemande.get('email').value ;
    let city = this.formDemande.get('city').value ;
    let specialite = this.formDemande.get('speciality').value ;
    console.log("this is " + firstName) ;

    this.serviceDoctolib.addDemande(new demande(firstName,lastName,specialite,city,email)).subscribe(
      (data)=> {
        console.log(data) ;
        this.Added=true ; 
      },error=> {
        console.log(error)
       }
    )
  }

}
