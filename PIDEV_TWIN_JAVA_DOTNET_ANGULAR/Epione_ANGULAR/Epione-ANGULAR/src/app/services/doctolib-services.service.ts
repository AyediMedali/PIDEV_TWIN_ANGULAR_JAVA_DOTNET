import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Headers, RequestOptions } from '@angular/http';
import { doctor } from '../entities/doctor';
import { demande } from '../entities/demande';
import { specialiteDoctolib } from '../entities/specialiteDoctolib';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class DoctolibServicesService {

  private headers = new HttpHeaders().set('content-type', 'application/json');

  private dataSource = new BehaviorSubject<string>("default message");
  currentData = this.dataSource.asObservable();


  public selectedDoctor : doctor ;

  constructor(private http : HttpClient , private cookieService:CookieService) { }


  getDoctolib(specialite:string) : Observable<doctor[]>{
    return this.http.get<doctor[]>("http://localhost:18080/Epione-web/rest/doctolib/getAll/"+specialite) ;
   }

   changeData(data : string)
   {
      this.dataSource.next(data);
   }

   getDemandes()
   {
     return this.http.get<demande[]>("http://localhost:18080/Epione-web/rest/doctolib/getDemande");
   }
   deleteDemande(demande:demande)
   {
    return this.http.post("http://localhost:18080/Epione-web/rest/doctolib/RejectDemande",demande,{headers:this.headers});
   }
   acceptDemande(demande:demande)
   {
    return this.http.post("http://localhost:18080/Epione-web/rest/doctolib/AcceptDemande",demande,{headers:this.headers});    
   }

   getDoctorDetails( doc : doctor) :Observable<doctor>
   {

      console.log("bch todkheeel") ;

      let dem : demande ;
      dem.firstName = doc.firstName ;
      dem.lastName = doc.lastName ; 
      dem.specialite = doc.specialite;
      dem.ville = doc.adresse.ville ;
      console.log(this.http.post<doctor>("http://localhost:18080/Epione-web/rest/doctolib/getDetails/",dem,{headers: this.headers} ) )

    return this.http.post<doctor>("http://localhost:18080/Epione-web/rest/doctolib/getDetails/",dem,{headers: this.headers} ) ;
   }

   addDemande(demande:  demande)
   {
     return this.http.post("http://localhost:18080/Epione-web/rest/doctolib/ajoutDemande",demande,{headers: this.headers}) ; 
   }

   getSpecialites()
   {
     return this.http.get<specialiteDoctolib[]>("http://localhost:18080/Epione-web/rest/doctolib/getAllSpecialites");
   }



   public getSelectedDoctor(): doctor {
      return this.selectedDoctor;
  }

  public setSelectedDoctor(doctor: any): void {
      this.selectedDoctor = doctor;
  }

  public addSpecialiteCookie(specialite)
  {
    if(this.cookieService.get("specialite").length>1)
    {
      let found = false ;
      var cookie = this.cookieService.get("specialite");
      var spcs = JSON.parse(cookie);
      for(var i=0 ; i<spcs.length;i++)
      {
        if(spcs[i].specialite==specialite) 
        {
          found = true ;
          spcs[i].number++ ;
        }
      }
      if (!found)
      {
        var newS= {"specialite":specialite,"number":1} ;
        console.log("*********************DKHAL********************************") ;
        console.log("*********************OBJECT :********************************") ;
        console.log(newS) ;
        console.log("*********************LISTE********************************") ;
        console.log(spcs);

        spcs.push(newS) ;
      }
      this.cookieService.set("specialite",JSON.stringify(spcs)) ;

    }
    else {
      console.log("**********************NON********************************") ;

      var arraySpecs =  [{"specialite":specialite,"number":1}];
        this.cookieService.set("specialite",JSON.stringify(arraySpecs));
    }
  }
  getCookieSpecialite()
  {
    var spcs = JSON.parse(this.cookieService.get("specialite")) ;
    if(spcs){
    var max = spcs[0] ;
    for(var i=1 ; i<spcs.length;i++)
    {
      if(spcs[i].number>max.number)
      {
        max=spcs[i];
      }
    }
    return max.specialite ;
  }
  else {
    return 0 ;
  }

  }

}
