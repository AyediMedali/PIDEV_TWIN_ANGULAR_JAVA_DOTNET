import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DoctolibServicesService } from 'src/app/services/doctolib-services.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { doctor } from 'src/app/entities/doctor';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-home-patient',
  templateUrl: './home-patient.component.html',
  styleUrls: ['./home-patient.component.css']
})
export class HomePatientComponent implements OnInit {


  SpecLoaded : boolean=false ;
  specialiteCookie ;
  message : string ;
  ListDoctors = [] ;
  specialites = [] ;
  doctor :doctor ;
  specSearch = this.fb.group({
    specialite: [''] 
  })

  constructor(private doctorService : UserService ,private fb:FormBuilder , private doctolibService:DoctolibServicesService , private router : Router , private cookieService:CookieService)
  {
    this.doctolibService.currentData.subscribe((data) => this.message=data);
  }


  ngOnInit() {
    if(this.doctolibService.getCookieSpecialite()!=0)
    {
      this.specialiteCookie = this.doctolibService.getCookieSpecialite() ;
    }


    this.doctorService.getDoctors2().subscribe(
      (Data) => {
        this.ListDoctors = Data ; 
        console.log("******LIST DOCTORS*********");
        console.log(this.ListDoctors);
        let i=0 ;
        for(let x of this.ListDoctors)
        {
          if(i==0){ this.doctor =x;
          i++;
          }
          else {
            if(x.dateCreation > this.doctor.dateCreation)
            {
              this.doctor = x;
            }
          }
        }
        this.ListDoctors=this.ListDoctors.filter(
          (data) => {
            console.log("******************************cooookie") ;
            console.log(this.specialiteCookie) ;
            var s = data.specialite.split(" ").join("-");
             s = s.split("é").join("e");
            if(s.toUpperCase()==this.specialiteCookie.toUpperCase()) return true ;
          }
        ).splice(0,2);
        console.log(this.doctor) ;
        console.log("*********************Liste******************") ;
        console.log(this.ListDoctors)
      }
     )
     this.doctolibService.getSpecialites().subscribe(
      Data => {
        this.specialites = Data;
        this.SpecLoaded=true ;
      }
    )
  }

  OnSubmit()
  {
    let spec =  this.specSearch.get('specialite').value ;
    this.doctolibService.changeData(spec);
    this.router.navigate(['patient/doctolibliste']) ;

  }

}
