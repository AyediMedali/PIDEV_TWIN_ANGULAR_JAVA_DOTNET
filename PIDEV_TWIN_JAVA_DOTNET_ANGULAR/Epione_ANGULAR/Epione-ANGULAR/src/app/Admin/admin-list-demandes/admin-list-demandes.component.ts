import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DoctolibServicesService } from 'src/app/services/doctolib-services.service';
import { demande } from 'src/app/entities/demande';
import { Response } from '@angular/http';
import { doctor } from 'src/app/entities/doctor';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'ngbd-modal-content',
  template: `
  
    <div class="modal-header">
      <h4 class="modal-title">Doctor was added successfully</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <div class="list_general">
  <ul>
    <li>
      <figure><img src={{doctor.image}} alt=""></figure>
      <h4>{{doctor.firstName}} {{doctor.lastName}}</h4>
      <ul class="booking_details">
        <li><strong>Speciality</strong> {{doctor.specialite}}</li>
        <li><strong>City</strong> {{doctor.adresse.ville}}</li>
        <li><strong>Email</strong>{{doctor.email}}</li>
      </ul>
    </li>
  </ul>
</div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() doctor;

  constructor(public activeModal: NgbActiveModal) {}
}



@Component({
  selector: 'app-admin-list-demandes',
  templateUrl: './admin-list-demandes.component.html',
  styleUrls: ['./admin-list-demandes.component.css']
})
export class AdminListDemandesComponent implements OnInit,OnChanges {


  loading : boolean = false  ;
  demande : demande ={
    id : 0 ,
    email : "" ,
    firstName:"",
    lastName:"",
    specialite:"",
    ville:""
  } ; 
  addedDoctor : Object ;
  listDemandes= [] ;
  constructor(private serviceDoctolib : DoctolibServicesService ,private modalService:NgbModal,private excel : ExcelService) { }

  ngOnInit() {
   this.serviceDoctolib.getDemandes().subscribe(
     Data => {
       this.listDemandes = Data;
     }
   )
  }
  ngOnChanges(){
    this.serviceDoctolib.getDemandes().subscribe(
      Data => {
        this.listDemandes = Data;
      }
    )
  }
  Cancel(dem)
  {
    console.log("email is : "+dem) ;
    this.demande= dem ;
    console.log("selcted is " + this.demande.email) ;
   this.serviceDoctolib.deleteDemande(this.demande).subscribe(
      (data )=>{
        if(data)
        {
          if(data['email'])
          {
            this.listDemandes.splice(this.listDemandes.indexOf(this.demande) , 1) ;
          }
        }
       // this.demands.splice(this.demands.indexOf(demand), 1);
      }
    ) ;
  }
  Approve(dem)
  {
    this.loading=true ;
    this.demande = dem ;
    this.serviceDoctolib.acceptDemande(this.demande).subscribe(
      (data) => {
        if(data)
        {
          if(data['email'])
          {
            if(data['id']>0)
            {
                this.addedDoctor = data ;
                this.loading=false ;
                console.log(this.addedDoctor) ;
                this.listDemandes.splice(this.listDemandes.indexOf(this.demande) , 1) ;
                const modalRef = this.modalService.open(NgbdModalContent,{ size: 'lg' });
      modalRef.componentInstance.doctor = this.addedDoctor;
 
            }
          }
        }
      }
      ,(error) => {
        this.loading=false ;
        alert('An error has occured') ;
      }
    )
  }
  exportToExcel()
  {
    console.log("exported")
    this.excel.exportToExcel() ;
  }
}
