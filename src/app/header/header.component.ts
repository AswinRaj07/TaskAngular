import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})


export class HeaderComponent {
     constructor(private router:Router){}
     logout(){
      localStorage.clear()
      alert("logged out")
      this.router.navigate([''])
     }
}
