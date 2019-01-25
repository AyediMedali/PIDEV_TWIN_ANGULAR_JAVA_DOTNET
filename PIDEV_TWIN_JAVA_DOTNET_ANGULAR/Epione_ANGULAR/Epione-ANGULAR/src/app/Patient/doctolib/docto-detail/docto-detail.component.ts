import { Component, OnInit } from '@angular/core';
import { DoctolibServicesService } from 'src/app/services/doctolib-services.service';
import { doctor } from 'src/app/entities/doctor';



@Component({
  selector: 'app-docto-detail',
  templateUrl: './docto-detail.component.html',
  styleUrls: ['./docto-detail.component.css']
})
export class DoctoDetailComponent implements OnInit {

  selectedDoctor : doctor;
  doctor:Object ; 
  
  constructor(private doctolibService : DoctolibServicesService) { 
    this.selectedDoctor = doctolibService.getSelectedDoctor() ; 
    console.log("xxxxxxxxxxxxxxxxxxxxx") ;
    console.log(this.selectedDoctor) ;
    console.log("xxxxxxxxxxxxxxxxxxxxx") ;

    this.doctolibService.getDoctorDetails(this.selectedDoctor).subscribe(
      (Data) => {
        this.doctor = Data ; 
        console.log("doctors details are : " + Data);

      },
      error => {console.log(error) ; }
     );
  }

  ngOnInit() { 
  }

}
