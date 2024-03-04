import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink,Router } from '@angular/router';


@Component({
  selector: 'app-userreg',
  standalone: true,
  imports: [FormsModule,HttpClientModule,RouterLink],
  templateUrl: './userreg.component.html',
  styleUrl: './userreg.component.scss'
})
export class UserregComponent {
   registrationobj:register;
   constructor(private http:HttpClient,private router:Router){
    this.registrationobj =new register();
   }

   onRegister(){
     this.http.post("http://localhost:5000/api/Users/register",this.registrationobj,{withCredentials:true}).subscribe((res:any)=>{
      console.log(res)
          if(res.message === "User created sucessfully"){
            alert("register sucessfully")
             this.router.navigate(['userlogin'])
          }
          else{
            alert(res.message)
          }

     })
   }
}
export class register{
  firstname:string;
  lastname:string;
  email:string;
  password:string;

  constructor(){
    this.firstname="";
    this.lastname="";
    this.email ="";
    this.password="";

  }
}
