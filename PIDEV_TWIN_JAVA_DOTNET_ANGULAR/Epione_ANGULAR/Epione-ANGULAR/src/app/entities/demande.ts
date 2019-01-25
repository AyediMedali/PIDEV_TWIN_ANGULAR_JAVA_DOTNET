export class demande{
    id : number ; 
    firstName : string ; 
    lastName : string ; 
    specialite : string; 
    ville : string ;
    email : string ;

    constructor(firstName , lastName , specialite , ville , email){
        this.firstName = firstName ; 
        this.lastName = lastName ; 
        this.specialite= specialite ; 
        this.ville=ville ; 
        this.email = email ; 
    }
}