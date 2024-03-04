import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { error } from 'console';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-adminlogin',
  standalone: true,
  imports: [FormsModule,HttpClientModule,RouterLink],
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.scss'
})
export class AdminloginComponent {
     logObj :Login;
     constructor(private http:HttpClient, private router:Router){
      this.logObj =new Login();
     }

     onLogin(){
         this.http.post('http://localhost:5000/api/admin/login',this.logObj,{withCredentials:true}).subscribe((res:any)=>{
          if(res.message === "Login Sucess"){
            alert("Login Sucess")
            this.router.navigate(['adminpage'])
          }
          else{
            alert(res.message)
            console.log(res.message)
          }
        }
        )
     }
}

export class Login{
  username:string;
  password:string;

  constructor(){
    this.username="";
    this.password="";
  }
}
