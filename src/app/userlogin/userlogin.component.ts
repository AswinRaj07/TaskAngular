import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink,Router } from '@angular/router';


@Component({
  selector: 'app-userlogin',
  standalone: true,
  imports: [HttpClientModule, FormsModule, RouterLink],
  templateUrl: './userlogin.component.html',
  styleUrl: './userlogin.component.scss',
})
export class UserloginComponent {
  logObj: Login;
  constructor(private http: HttpClient, private router:Router) {
    this.logObj = new Login();
    const logged = localStorage.getItem('userId');
    if (logged != null) {
      const parsobj = JSON.parse(logged);
      this.cusIdobj = parsobj;
      console.log(this.cusIdobj);
    }
  }

  cusIdobj: any;

  onLogin() {
    this.http
      .post('http://localhost:5000/api/Users/Login', this.logObj, {
        withCredentials: true,
      })
      .subscribe((res: any) => {
        console.log(res.userWithEmail.id);
        console.log(res.message);
        console.log(res);
        if (res.message === 'Login Sucess') {
          alert('User Login sucess');
          localStorage.setItem('userId', JSON.stringify(res.userWithEmail.id));
          this.router.navigate([''])
        } else {
          alert("Invalid data");
        }
      },(error)=>{
        console.log(error.message)
      });
  }
}
export class Login {
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}
