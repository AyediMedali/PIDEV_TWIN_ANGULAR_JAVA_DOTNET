import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { patient } from '../entities/patient' ; 

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})

export class PatientComponent implements OnInit {

  constructor(private patientService : UserService) { }

  patientConnected : patient ; 

  ngOnInit() {
    this.patientService.getPatientById().subscribe((Data)=>{
       this.patientConnected = Data ; 
       console.log("patient connected id = "+Data.id) ; 
    })
  }

  Logout()
  {
    console.log('logged out before :' +localStorage.getItem('userId')) ;
    localStorage.clear() ;
    console.log('logged out after : '+ localStorage.getItem('userId')) ;
  }
}
