import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, Output, output} from '@angular/core';
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

  private readonly  _cartService = inject(CartService);
  private readonly  _FavoriteService = inject(FavoriteService);
  private readonly  _ToastrService = inject(ToastrService);

  @Input() isFromFavorite ?:boolean = false;

  // productList:Iproduct[] = [];

  // ngOnInit(): void {
  //     this._ProductService.getAllProduct().subscribe(
  //           {
  //             next: (res)=>{
  //               this.productList = res.data;
  //             },
  //             error:(err) =>{
  //               console.log(err);
  //             }
  //           }
  //     )
  // }

  @Input() product !: Iproduct;

  addToCart(id:string):void{
      this._cartService.addProductToCart(id).subscribe({
        next:(res)=>{
          console.log(res);
          this._ToastrService.success(
            res.message
          )
        }
      })
  }
  addToFavorite(id:string):void{
      this._FavoriteService.addToWishList(id).subscribe({
        next:(res)=>{
          console.log(res);
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
      buttons: ["Cancel", "Delete"], // Use an array for button labels
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this._FavoriteService.deleteFromWishList(id).subscribe({
          next: (res) => {
            this._ToastrService.success(res.message);
          }
        });
      }
    });
  }



}
