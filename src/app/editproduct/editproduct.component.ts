import { routes } from './../app.routes';
import { AddProduct } from './../addproduct/addproduct.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editproduct',
  standalone: true,
  imports: [FormsModule,HttpClientModule],
  templateUrl: './editproduct.component.html',
  styleUrl: './editproduct.component.scss'
})
export class EditproductComponent implements OnInit {
     editProductobj:Edit;

     constructor(private http:HttpClient,private route:ActivatedRoute){
       this.editProductobj =new Edit();
       console.log(this.editProductobj);

      }

      ngOnInit(): void {
        this.editProductobj.id = this.route.snapshot.paramMap.get('id');
        console.log(this.editProductobj.id)
        this.http.get(`http://localhost:5000/api/productbyid/${this.editProductobj.id}`).subscribe((res:any)=>{
           this.editProductobj =res.productbyid;
            console.log( this.editProductobj);
            if(res.result){
               console.log("sucess")
              }
            else{
              console.log(res.message)
            }
        })
      }

      onEdit(id:number){
        console.log(id)
         this.http.put(`http://localhost:5000/api/product/edit/${id}`,this.editProductobj).subscribe((res:any)=>{
          console.log(res)
          if(res.result){
            console.log("Product Uopdated sucessfully")
          }
          else{
            console.log(res.message);
          }
         })
      }
}

export class Edit{
    id:any;
    name:string;
    price:number
    imagePath:string;

    constructor(){
        this.id =0;
        this.name ="";
        this.price =0;
        this.imagePath ="";
    }
}
