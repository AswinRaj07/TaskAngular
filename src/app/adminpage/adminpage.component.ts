import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Product{
  id: number;
  name: string;
  price: string;
  imagePath: string;
 }


@Component({
  selector: 'app-adminpage',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule,RouterLink],
  templateUrl: './adminpage.component.html',
  styleUrl: './adminpage.component.scss'
})


export class AdminpageComponent implements OnInit {
  constructor(private http:HttpClient){}

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

  onRemove(id:number){
    this.http.delete(`http://localhost:5000/api/product/delete/${id}`).subscribe((res:any)=>{
      if(res.result){
        console.log("Product Removed sucessfully")
      }else{
        console.log(res.message)
      }
      window.location.reload()
    })

  }

}
