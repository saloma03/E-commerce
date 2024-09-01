import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavoriteService } from '../../core/services/favorite.service';
import swal from 'sweetalert';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgClass , CurrencyPipe ,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{


  cartDetails : ICart  = {} as ICart;
  numberOfCartItems:number = 0;
  cartId : string | null = null;
  clearing : boolean = false;

  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _FavoriteService = inject(FavoriteService);


  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (res)=>{
        console.log(res);
        this.numberOfCartItems = res.numOfCartItems;
        this.cartId = res.cartId;
          this.cartDetails = res.data;
      },
      error: (err)=>
        console.log(err)
    })
  }


  removeProduct(id : string) : void{

    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: ["Cancel", "Delete"], // Use an array for button labels
      dangerMode: true,
    }).then((willDelete) => {
      this._CartService.removeProductFromCart(id).subscribe({
        next: (res)=>{
          this._ToastrService.success(res.message)
          this.numberOfCartItems = res.numOfCartItems;
          this.cartId = res.cartId;

          this.cartDetails = res.data;
        }
      })
    });

  }

  updateQuantity(id:string , countNumber : number){
    this._CartService.updateProductQuantity(id,countNumber ).subscribe({
      next: (res)=>{
        this.numberOfCartItems = res.numOfCartItems;
        this._ToastrService.success("count updated")
        this.cartId = res.cartId;
        this.cartDetails = res.data;
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

  clearCart():void {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: ["Cancel", "Delete"], // Use an array for button labels
      dangerMode: true,
    }).then((willDelete) => {
      this.clearing = true;

      this._CartService.clearCart().subscribe(
        {
          next:(res)=>{
            this.numberOfCartItems = 0;
            this._ToastrService.success(res.message)

            this.clearing = false;
            if(res.message == "success"){
              this.cartDetails = {} as ICart;
            }
            console.log(res)
          }
        }
       )
    })

  }

  addToFavorite(id : string) : void{
      this._FavoriteService.addToWishList(id).subscribe({
        next:(res)=>{
          this._ToastrService.success(res.message)

        }
      })
  }



}
