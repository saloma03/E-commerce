import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication.service';
import { OrderService } from '../../core/services/order.service';
import { User } from '../../core/interfaces/user';
import { CurrencyPipe } from '@angular/common';
import {Iorder} from '../../core/interfaces/iorder';
@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit{
  private readonly _AuthenticationService= inject(AuthenticationService);
  private readonly _OrderService= inject(OrderService);
  orderedProducts!:Iorder[];
  userId!: User;
  ngOnInit(): void {
      this.userId = this._AuthenticationService.saveUserData();
      console.log(this.userId.id);
      this._OrderService.getUserOrders(this.userId.id).subscribe({
        next:(res)=>{
          console.log(res);
          this.orderedProducts = res;
          console.log(this.orderedProducts);
        }
      })
  }

}

/*
{
    "shippingAddress": {
        "details": "Maadi",
        "phone": "01101376526",
        "city": "Cairo"
    },
    "taxPrice": 0,
    "shippingPrice": 0,
    "totalOrderPrice": 1597,
    "paymentMethodType": "card",
    "isPaid": true,
    "isDelivered": false,
    "_id": "66d5b89a9f2845fbe68354bb",
    "user": {
        "_id": "66c11a9ded0dc0016c8ece0e",
        "name": "salma",
        "email": "salmaom3r@gmail.com",
        "phone": "01101379876"
    },
    "cartItems": [
        {
            "count": 1,
            "_id": "66d5b7549f2845fbe68342ab",
            "product": {
                "subcategory": [
                    {
                        "_id": "6407f243b575d3b90bf957ac",
                        "name": "Men's Clothing",
                        "slug": "men's-clothing",
                        "category": "6439d5b90049ad0b52b90048"
                    }
                ],
                "ratingsQuantity": 3,
                "_id": "6428c0fedc1175abc65c9ffd",
                "title": "Crew Neck Long Sleeve Striped Men's Tricot Sweater",
                "imageCover": "https://ecommerce.routemisr.com/Route-Academy-products/1680392445443-cover.jpeg",
                "category": {
                    "_id": "6439d5b90049ad0b52b90048",
                    "name": "Men's Fashion",
                    "slug": "men's-fashion",
                    "image": "https://ecommerce.routemisr.com/Route-Academy-categories/1681511865180.jpeg"
                },
                "brand": {
                    "_id": "64089d9e24b25627a25315a5",
                    "name": "LC Waikiki",
                    "slug": "lc-waikiki",
                    "image": "https://ecommerce.routemisr.com/Route-Academy-brands/1678286238428.png"
                },
                "ratingsAverage": 2,
                "id": "6428c0fedc1175abc65c9ffd"
            },
            "price": 599
        },
        {
            "count": 1,
            "_id": "66d5b7589f2845fbe68342d1",
            "product": {
                "subcategory": [
                    {
                        "_id": "6407f243b575d3b90bf957ac",
                        "name": "Men's Clothing",
                        "slug": "men's-clothing",
                        "category": "6439d5b90049ad0b52b90048"
                    }
                ],
                "ratingsQuantity": 3,
                "_id": "6428c320dc1175abc65ca008",
                "title": "Crew Neck Long Sleeve Men's Knitwear Sweater",
                "imageCover": "https://ecommerce.routemisr.com/Route-Academy-products/1680392991271-cover.jpeg",
                "category": {
                    "_id": "6439d5b90049ad0b52b90048",
                    "name": "Men's Fashion",
                    "slug": "men's-fashion",
                    "image": "https://ecommerce.routemisr.com/Route-Academy-categories/1681511865180.jpeg"
                },
                "brand": {
                    "_id": "64089d9e24b25627a25315a5",
                    "name": "LC Waikiki",
                    "slug": "lc-waikiki",
                    "image": "https://ecommerce.routemisr.com/Route-Academy-brands/1678286238428.png"
                },
                "ratingsAverage": 4.7,
                "id": "6428c320dc1175abc65ca008"
            },
            "price": 449
        },
        {
            "count": 1,
            "_id": "66d5b75c9f2845fbe68342e8",
            "product": {
                "subcategory": [
                    {
                        "_id": "6407f243b575d3b90bf957ac",
                        "name": "Men's Clothing",
                        "slug": "men's-clothing",
                        "category": "6439d5b90049ad0b52b90048"
                    }
                ],
                "ratingsQuantity": 3,
                "_id": "6428c3b8dc1175abc65ca00e",
                "title": "Slim Fit Long Sleeve Dobby Men's Shirt",
                "imageCover": "https://ecommerce.routemisr.com/Route-Academy-products/1680393143423-cover.jpeg",
                "category": {
                    "_id": "6439d5b90049ad0b52b90048",
                    "name": "Men's Fashion",
                    "slug": "men's-fashion",
                    "image": "https://ecommerce.routemisr.com/Route-Academy-categories/1681511865180.jpeg"
                },
                "brand": {
                    "_id": "64089d9e24b25627a25315a5",
                    "name": "LC Waikiki",
                    "slug": "lc-waikiki",
                    "image": "https://ecommerce.routemisr.com/Route-Academy-brands/1678286238428.png"
                },
                "ratingsAverage": 4.7,
                "id": "6428c3b8dc1175abc65ca00e"
            },
            "price": 549
        }
    ],
    "paidAt": "2024-09-02T13:07:38.254Z",
    "createdAt": "2024-09-02T13:07:38.256Z",
    "updatedAt": "2024-09-02T13:07:38.256Z",
    "id": 28304,
    "__v": 0
}

*/
