import { Component, OnInit } from '@angular/core';
import { DoctolibServicesService } from 'src/app/services/doctolib-services.service';
import { doctor } from 'src/app/entities/doctor';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-doctolib-list',
  templateUrl: './doctolib-list.component.html',
  styleUrls: ['./doctolib-list.component.css']
})
export class DoctolibListComponent implements OnInit {

  message: string; 
  selectedDoctor : doctor ;

  constructor(private doctolibService : DoctolibServicesService , private router : Router ,private cookieService:CookieService) {
    this.doctolibService.currentData.subscribe((data) => this.message=data);
    //this.cookieService.set("lastSpecialite",this.message);
    this.doctolibService.addSpecialiteCookie(this.message);


   }

  ListDoctors = [] ;

  ngOnInit() {

    this.doctolibService.getDoctolib(this.message).subscribe(
      (Data) => {
        this.ListDoctors = Data ; 
        console.log("doctors"+Data);
      }
     )
  }

  getDetails()
  {
   // this.doctolibService.setSelectedDoctor(d) ;
    this.router.navigate(['guest/demandeDoctolib']) ;
  }




}
