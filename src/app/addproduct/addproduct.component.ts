import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [FormsModule,HttpClientModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.scss'
})
export class AddproductComponent {
     addproductobj:AddProduct;
     constructor(private http:HttpClient){
      this.addproductobj =new AddProduct();
     }

onAddProduct(){
  this.http.post("http://localhost:5000/api/addProduct",this.addproductobj).subscribe((res:any)=>{
    console.log(res)
    if(res.result){
      alert("Product added sucessfully")
    }
    else{
      alert(res.message)
    }
    window.location.reload()
  })
}

}
export class AddProduct{
  name: string;
    price:number;
    imagePath:string;
    count:number;

    constructor(){
      this.name="";
      this.price=0;
      this.imagePath ="";
      this.count =0;
    }
}
