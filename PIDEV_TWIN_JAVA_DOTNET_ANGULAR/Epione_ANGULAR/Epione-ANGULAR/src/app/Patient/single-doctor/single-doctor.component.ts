import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { doctor } from 'src/app/entities/doctor';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { DoctolibServicesService } from 'src/app/services/doctolib-services.service';

@Component({
  selector: 'app-single-doctor',
  templateUrl: './single-doctor.component.html',
  styleUrls: ['./single-doctor.component.css']
})
export class SingleDoctorComponent implements OnInit {

  constructor(private fb:FormBuilder, private doctorService : UserService,private route:ActivatedRoute, private router:Router,private cookieService:CookieService , private doctolibService:DoctolibServicesService) { 

  }

  hideUnlike : boolean = false ; 
  hideLike : boolean = false ; 

  d : doctor ;
  comments = [] ; 
  i : number = 0 ;
  hideRating : boolean = false ;  
  countRating : number ;
  notePatient : number ; 
  average : number ; 
  countLikes : number ; 
  allRates = [] ; 
  star1 = false ; 
  star2 = false ; 
  star3 = false ; 
  star4 = false ; 
  star5 = false ; 
  msgRating = "" ; 
  starHide : boolean = false ; 
  identifiant : number ;
  showMenu : boolean = false  ; 
  userId = localStorage.getItem('userId') ;
  noComment = "" ;
  msgError = "" ; 
  DoctorId : number ;
  form = this.fb.group({
    contenu : ['',Validators.required]  })

  
  ngOnInit() {

    this.route.params.subscribe(params => {
      this.DoctorId = params['param'] ; 
    })

    this.doctorService.countDoctorLikes(this.DoctorId).subscribe((Data)=>{
       this.countLikes = Data ; 
       if(Data==null||Data==0){
         this.countLikes = 0 ; 
       }
    })

    this.doctorService.existLikeDoctor(this.DoctorId).subscribe((Data)=>{
      console.log("like exist ===== "+Data) ; 
      if(Data==false){
        this.hideLike = true ; 
        this.hideUnlike = false ;
        
      }else {
        this.hideLike = false ; 
        this.hideUnlike = true ;
      }
    })

    this.doctorService.getSingleDoctor(this.DoctorId).subscribe((Data) => {
      this.d = Data ; 
      this.doctolibService.addSpecialiteCookie(this.d.specialite) ;
    })
    this.doctorService.getCommentaireDoctor(this.DoctorId).subscribe((Data)=>{
      this.comments = Data ; 
      if(Data[0] == null){
        this.noComment="No comments" ;
      }
    })
    this.doctorService.countRatingDoctor(this.DoctorId).subscribe((Data)=>{
       this.countRating = Data ; 
       if(Data==0)
       this.countRating = 0 ; 
       console.log("nombre de notes = "+this.countRating) ; 
    })
    this.doctorService.countRatingPatient(this.DoctorId).subscribe((Data)=>{
      if(Data){
        this.hideRating = true ; 
        this.msgRating = "You've already rated this doctor"  ;
      } else 
      {
        this.hideRating = false ; 
      }
    })
    this.doctorService.getPatientRate(this.userId,this.DoctorId).subscribe((Data)=>{
      this.notePatient=Data ; 
    })
    this.doctorService.getAverageRateDoctor(this.DoctorId).subscribe((Data)=>{
      this.average = Data ;
      if(Data==null)
      this.average = -1 ; 
      console.log("average = "+this.average) ; 
    })
    this.doctorService.getAllRatings().subscribe((Data)=>{
      this.allRates = Data ; 
    })
   
console.log(JSON.parse(this.cookieService.get("specialite"))) ;
  }

  OnSubmit(){
    let content = this.form.get('contenu').value ; 
    let comment : any={
      "content" : content 
    }
    this.doctorService.addComment(comment,this.DoctorId).subscribe((Data)=>{
      if(Data['error']=="une erreur est survenue"){
        this.msgError="please enter some content" ;
      } else {
        this.doctorService.getCommentaireDoctor(this.DoctorId).subscribe((Data)=>{
          this.comments = Data ; })
      }
    })
  }

  show(id){
    this.identifiant = id ; 
    if(this.showMenu==false){
    this.showMenu = true ; }
    else this.showMenu = false ; 
  }

  deleteComment(com){
   this.comments.splice(this.comments.indexOf(com),1);
   this.doctorService.deleteComment(com.id).subscribe((Data)=>{
   })
  }

  editComment(com){
    com.content = this.form.get('contenu').value ;
    this.doctorService.modifierComment(com).subscribe((Data)=>{
    })
  }

  star1Change(){
    if(this.star1==false){
      this.star1=true ;  
      this.star2=false ;
      this.star3=false ;
      this.star4=false ;
      this.star5=false ;
      this.i=1 ;
      console.log("counttttttttttttttttttttttttt"+this.i) ;
    } 
    if((this.star1==true)&&(this.star2=true)){
      this.star1=true ;
      this.star2=false ;
      this.star3=false ;
      this.star4=false ;
      this.star5=false ;
      this.i=1 ;
      console.log("counttttttttttttttttttttttttt"+this.i) ;
    }
  }
  star2Change(){
    if(this.star2==false){
      this.star1=true ;
      this.star2=true ;
      this.star3=false ;
      this.star4=false ;
      this.star5=false ;
      this.i=2 ;
      console.log("counttttttttttttttttttttttttt"+this.i) ;
    } 
    if((this.star2==true)&&(this.star3==true)){
      this.star2=true ;
      this.star1=true;
      this.star3=false ;
      this.star4=false ;
      this.star5=false ;
      this.i=2 ;
      console.log("counttttttttttttttttttttttttt"+this.i) ;
    }
  }
  star3Change(){
    if(this.star3==false){
      this.star1=true ;
      this.star2=true ;
      this.star3=true ;
      this.star4=false ;
      this.star5=false ;
      this.i=3 ;
      console.log("counttttttttttttttttttttttttt"+this.i) ;
    }
    if((this.star3==true)&&(this.star4==true)){
      this.star3=true ;
      this.star2=true ; 
      this.star1=true ;
      this.star4=false ;
      this.star5=false ;
      this.i=3 ;
      console.log("counttttttttttttttttttttttttt"+this.i) ;
    }
  }
  star4Change(){
    if(this.star4==false){
      this.star4=true ;
      this.star5=false; 
      this.star3=true ; 
      this.star2=true ;
      this.star1=true ;
      this.i=4 ;
      console.log("counttttttttttttttttttttttttt"+this.i) ;
    }
    if((this.star4==true)&&(this.star5==true)){
      this.star4=true ;
      this.star3=true ;
      this.star2=true ; 
      this.star1=true ;
      this.star5=false ;
      this.i=4 ;
      console.log("counttttttttttttttttttttttttt"+this.i) ;
      }
  }
  star5Change(){
    if(this.star5==false){
      this.star5=true;
      this.star4=true;
      this.star3=true;
      this.star2=true;
      this.star1=true;
      this.i=5 ;
      console.log("counttttttttttttttttttttttttt"+this.i) ;
    }
  }
   rate(){
     let rating : any={
       "note" : this.i 
     }
     this.doctorService.addRating(rating,this.DoctorId).subscribe((Data)=>{
       this.msgRating = "Thank you for rating this doctor" ;
       this.countRating = this.countRating + 1 ; 
       this.hideRating = true ;
       window.location.reload(); 
     })
   }

   fonction(index,index2){
      if(index==1){
     this.starHide = true ;}
     else this.starHide = false ; 
   }

  likeDoctor(){
    this.doctorService.likeDoctor(this.DoctorId).subscribe((Data)=>{
      this.hideLike = false ; 
      this.hideUnlike = true ; 
    })
  }

  

   



}
