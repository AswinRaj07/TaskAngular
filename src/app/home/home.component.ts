import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { error } from 'console';
import { Observable } from 'rxjs';

interface Product{
  id: number;
  name: string;
  price: string;
  imagePath: string;
 }

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule,CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})



export class HomeComponent implements OnInit {

  addToCartObj:Addcart;
  constructor(private http:HttpClient, private router:Router){
    this.addToCartObj =new Addcart();

    const logged =localStorage.getItem('userId')
    if(logged != null){
     const parsobj = JSON.parse(logged);
     this.cusIdobj =parsobj;
     console.log(this.cusIdobj)
    }
  }
cusIdobj:any;

  getProduct():Observable<any>{
    return this.http.get<Product[]>("http://localhost:5000/api/viewProduct")
  }
  products:any|Product[]

  ngOnInit(): void {
     this.viewProduct();
  }
  viewProduct(){
    this.getProduct().subscribe((res)=>{
    console.log(res);
    this.products =res;
    console.log(this.products)
    })

  }


  addToCart(productId:number,userId:number){
    const data = { productId:productId,userId:userId };
    this.http.post("http://localhost:5000/api/product/addTocart",data).subscribe((res:any)=>{
      console.log(res)
      if(res.message === "product added sucessfully"){
        alert(res.message)
      }else{
        console.log("Login failed",res.error.message)
        alert("Please login");
        this.router.navigate(['userlogin'])

      }
    }
    )
  }
}


export class Addcart{
     userId:number;
     productId:number;
     quantity:number;

     constructor(){
      this.userId =0;
      this.productId=0;
      this.quantity=1;
     }
}
