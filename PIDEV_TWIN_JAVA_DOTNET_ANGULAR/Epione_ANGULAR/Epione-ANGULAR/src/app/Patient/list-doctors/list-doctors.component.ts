import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { DoctorComponent } from 'src/app/doctor/doctor.component';
import { doctor } from 'src/app/entities/doctor';

@Component({
  selector: 'app-list-doctors',
  templateUrl: './list-doctors.component.html',
  styleUrls: ['./list-doctors.component.css']
})
export class ListDoctorsComponent implements OnInit {

  constructor(private doctorService : UserService) { }

  ListDoctors = [] ;
  detailsDoctor : doctor ;
  countRating : number = 0 ; 
  hideUnlike : boolean = false ; 
  hideLike : boolean = false ; 

  ngOnInit() {

    this.doctorService.getDoctors().subscribe(
      (Data) => {
        this.ListDoctors = Data ; 
        console.log("doctors"+Data);
      }
     )

     this.hideLike = true ; 
    
  }

  getDetails(d )
  {
    console.log(d) ;
  }



  


}
