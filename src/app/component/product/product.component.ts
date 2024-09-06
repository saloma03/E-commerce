import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, Output, output, signal, WritableSignal } from '@angular/core';
import { Iproduct } from '../../core/interfaces/iproduct';
import { SlicenamePipe } from '../../core/pipes/slicename.pipe';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavoriteService } from '../../core/services/favorite.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SlicenamePipe , CurrencyPipe , RouterLink ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductComponent {

  private readonly  _CartService = inject(CartService);
  private readonly  _FavoriteService = inject(FavoriteService);
  private readonly  _ToastrService = inject(ToastrService);


  @Input() isFromFavorite ?:boolean = false;

  @Input() product !: Iproduct;

  addToCart(id:string):void{
      this._CartService.addProductToCart(id).subscribe({
        next:(res)=>{
          // console.log(res);
          this._CartService.numOfCart.set(res.numOfCartItems)
          console.log("here cart num" , this._CartService.numOfCart())

          this._ToastrService.success(
            res.message
          )
        }
      })
  }
  addToFavorite(id:string):void{
      this._FavoriteService.addToWishList(id).subscribe({
        next:(res)=>{
          console.log("aaaadddd",res)
          this._FavoriteService.numOfFav.set(res.data.length)
          this._ToastrService.success(
            res.message
          )
        }
      })
  }
  removeFromFavorite(id: string): void {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this._FavoriteService.deleteFromWishList(id).subscribe({
          next: (res) => {
            console.log(res)
            this.product = res.data;
            this._FavoriteService.numOfFav.set(res.data.length)

            this._ToastrService.success(res.message);
          }
        });
      }
    });
  }



}
