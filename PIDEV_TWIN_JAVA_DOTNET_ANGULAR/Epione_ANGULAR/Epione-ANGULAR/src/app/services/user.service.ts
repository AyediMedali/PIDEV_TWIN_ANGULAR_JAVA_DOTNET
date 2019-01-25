import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { user } from '../entities/user';
import { Observable } from 'rxjs';
import { doctor } from '../entities/doctor';
import { motif } from '../entities/motif';
import { commentaire } from '../entities/commentaire';
import { rating } from '../entities/rating';
import { patient } from '../entities/patient';
import { message } from '../entities/message';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isPatientLoggedIn = false ; 
  private isAdminLoggedIn = false ; 
  private isDoctorLoggedIn = false ; 


  constructor(private http : HttpClient) { }

  url = 'http://localhost:18080/Epione-web/rest/users/' ;
  urlD = "http://localhost:18080/Epione-web/rest/doctors/" ;
  urlC = "http://localhost:18080/Epione-web/rest/commentaires/" ; 
  urlR = "http://localhost:18080/Epione-web/rest/rating/" ;
  urlP = "http://localhost:18080/Epione-web/rest/patients/" ;
  urlL = "http://localhost:18080/Epione-web/rest/likes/" ;
  urlM  = "http://localhost:18080/Epione-web/rest/messages" ; 


  LoginAdmin(email , password)
  {
    localStorage.setItem('loggedIn','true') ;
    this.isAdminLoggedIn=true;
    return this.http.post(this.url+"logInAdmin?email="+email+"&password="+password,null);
  }
  
  LoginPatient(email , password)
  {
    localStorage.setItem('loggedIn','true') ;
    this.isPatientLoggedIn=true ; 
    return this.http.post(this.url+"logInPatient?email="+email+"&password="+password,null);
  }
  SignPatient(user : any) 
  {
    console.log(user) ;
    return this.http.post(this.url+"signInPatient" , user) ;
  }
  LoginDoctor(email , password)
  {
    localStorage.setItem('loggedIn','true') ;
    this.isDoctorLoggedIn=true ;
    return this.http.post(this.url+"logInDoctor?email="+email+"&password="+password,null);
  }

  getDoctors() : Observable<doctor[]>{
   return this.http.get<doctor[]>(this.urlD) ;
  }
  getDoctors2() {
    return this.http.get<doctor[]>(this.urlD) ;
   }

  getSingleDoctor(id : number) : Observable<doctor> {
    console.log(this.urlD+"details?id"+id); 
   return this.http.get<doctor>(this.urlD+"details?id="+id) ;
  }

  getCommentaireDoctor(id : number) : Observable<commentaire[]>{
    return this.http.get<commentaire[]>(this.urlC+"doctor?idD="+id) ; 
  }

  addComment(comment,idDoctor){
    return this.http.post(this.urlC+"?idP="+localStorage.getItem('userId')+"&idD="+idDoctor,comment) ;
  }

  deleteComment(idComment :number){
    return this.http.delete(this.urlC+"delete?idC="+idComment) ;
  }

  modifierComment(c:commentaire){
    return this.http.post(this.urlC+"modifier",c) ;
  }

  addRating(r:rating,idDoctor){
     return this.http.post(this.urlR+"?idP="+localStorage.getItem('userId')+"&idD="+idDoctor,r) ;
  }

  countRatingDoctor(idDoctor:number) : Observable<number>{
    return this.http.get<number>(this.urlR+"count?idD="+idDoctor) ; 
  }

  countRatingPatient(id) : Observable<boolean>{
    return this.http.get<boolean>(this.urlR+"countPatient?idP="+localStorage.getItem('userId')+"&idD="+id) ; 
  }

  getPatientRate(idPatient,idDoctor) : Observable<number>{
    return this.http.get<number>(this.urlR+"note?idP="+idPatient+"&idD="+idDoctor) ; 
  }

  getAverageRateDoctor(idDoctor) : Observable<number>{
    return this.http.get<number>(this.urlR+"average?idD="+idDoctor) ; 
  }

  getAllRatings() : Observable<rating[]>{
    return this.http.get<rating[]>(this.urlR+"all") ; 
  }

  getPatientById() : Observable<patient>{
    return this.http.get<patient>(this.urlP+"patient?idP="+localStorage.getItem('userId')) ;
  }

  likeDoctor(idDoctor) {
    return this.http.post(this.urlL+"like?idP="+localStorage.getItem('userId')+"&idD="+idDoctor,null) ; 
  }

  existLikeDoctor(idDoctor) : Observable<boolean>{
    return this.http.get<boolean>(this.urlL+"exist?idP="+localStorage.getItem('userId')+"&idD="+idDoctor);
  }

  countDoctorLikes(idDoctor) : Observable<number>{
    return this.http.get<number>(this.urlL+"count?idD="+idDoctor) ; 
  }

  getCommentPatient(id) : Observable<commentaire[]>{
    return this.http.get<commentaire[]>(this.urlC+"patient?idP="+id) ; 
    } 

  getAllRatesByPatient(id) : Observable<rating[]>{
    return this.http.get<rating[]>(this.urlR+"allPatient?idP="+id) ; 
  }

  updateProfilePatient(user : patient){
    return this.http.post(this.urlP,user)  ; 
  }

  sendMessageDoctor(idDoctor,msg : message){
    return this.http.post(this.urlM+"?patientId="+localStorage.getItem('userId')+"&doctorId="+idDoctor,msg) ; 
  }

  getPatientMessages() : Observable<message[]>{
    return this.http.get<message[]>(this.urlM+"?patientId="+localStorage.getItem('userId')) ; 
  }

  getCountMessagesPatient() : Observable<number> {
    return this.http.get<number>(this.urlM+"/count?patientId="+localStorage.getItem('userId')) ; 
  }





  get getIsPatientLoggedIn()
  {
    return this.isPatientLoggedIn;
  }
  setIsPatientLoggedIn(value :boolean)
  {
    this.isPatientLoggedIn=value;
  }
  get getIsDoctorLoggedIn()
  {
    return this.isDoctorLoggedIn;
  }
  setIsDoctorLoggedIn(value :boolean)
  {
    this.isDoctorLoggedIn=value;
  }
   getIsAdminLoggedIn()
  {
    return this.isAdminLoggedIn;
  }
  setIsAdminLoggedIn(value :boolean)
  {
    this.isAdminLoggedIn=value;
  }

}
