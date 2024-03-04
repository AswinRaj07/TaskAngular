import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { count } from 'console';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
interface CartProduct {
  quantity: any;
  productId: any;
}

interface Product {
  id: number;
  count: number;
  name: string;
  price: string;
  imagePath: string;
}
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  constructor(private http: HttpClient) {
    const logged = localStorage.getItem('userId');
    if (logged != null) {
      const parsobj = JSON.parse(logged);
      this.cusIdobj = parsobj;
      console.log(this.cusIdobj);
    }
  }
  cusIdobj: any;
  getProductId(): Observable<any> {
    const userId = this.cusIdobj;
    return this.http.get<CartProduct[]>(
      `http://localhost:5000/api/product/viewcartproduct/${userId}`
    );
  }
  getProductDetails(prodId: any): Observable<any> {
    console.log(prodId);
    return this.http.post<Product[]>(
      `http://localhost:5000/api/product/detailview`,
      prodId
    );
  }
  cartproducts: any | CartProduct[];
  product: any | Product[];
  totalPrice: number = 0;

  ngOnInit(): void {
    this.viewProduct();
  }
  viewProduct() {
    this.getProductId().subscribe((res) => {
      this.cartproducts = res.data;
      console.log(this.cartproducts);
      const prodId = Object.values(this.cartproducts).map(
        (product: any) => product.productId
      );
      console.log(prodId);

      this.getProductDetails(prodId).subscribe((res) => {
        console.log(res.response);
        this.product = res.response;
        console.log(this.product);
      });
    });
  }

  onRemove(productId:number) {
    this.http
      .delete(`http://localhost:5000/api/cartproduct/delete/${productId}`)
      .subscribe((res: any) => {
        if (res.result) {
          console.log('Product Removed sucessfully');
        } else {
          console.log(res.message);
        }
        window.location.reload();
      });
  }

  increment(product: any) {
    var countI: any = 1;
    if (product.count != 5) {
      countI = product.count += 1;
    }
  }
  deg(product: any) {
    var countD = 1;
    if (product.count != 1) {
      countD = product.count -= 1;
    }
  }
  calculateTotalPrice(): number {
    let totalPrice = 0;
    for (const item of this.product) {
      totalPrice += item.price * item.count;
    }
    return totalPrice;
  }
}
