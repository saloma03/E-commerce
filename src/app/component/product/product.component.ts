import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, Output, Signal, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert';
import { SlicenamePipe } from '../../core/pipes/slicename.pipe';
import { CartService } from '../../core/services/cart.service';
import { FavoriteService } from '../../core/services/favorite.service';
import { Iproduct } from './../../core/interfaces/iproduct';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SlicenamePipe ,NgClass, CurrencyPipe , RouterLink ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductComponent {

  private readonly  _CartService = inject(CartService);
  private readonly  _FavoriteService = inject(FavoriteService);
  private readonly  _ToastrService = inject(ToastrService);

  // productList:WritableSignal<Iproduct[]> = signal([]);

  @Input() isFromFavorite ?:boolean = false;
  @Input() product !: Iproduct;
  @Input() isFav !:boolean;
  @Output() deletedProduct = new EventEmitter<void>();
  @Output() addedProduct = new EventEmitter<void>();



  isProductInFavorites(): boolean {
    // let x = this._FavoriteService.ProductFavList().some((p) => p._id === this.product._id);
    // console.log(x);
    // console.log("product to be compare" ,this.product)
    return this._FavoriteService.ProductFavList().some((p) => p._id === this.product._id);
  }


  ngOnInit(): void {

    this._FavoriteService.getUserWishList().subscribe({
      next:(res)=>{
        console.log("favvvov" , res)
        this._FavoriteService.ProductFavList.set(res.data);
        console.log("list of products ",res.data);
      }
    })
  }


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
          // console.log("aaaadddd",res)
          const updatedList = [...this._FavoriteService.ProductFavList(), this.product];
          this._FavoriteService.ProductFavList.set(updatedList);
            this.addedProduct.emit();
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
            const updatedList = this._FavoriteService.ProductFavList().filter(id => id !== this.product);
            this._FavoriteService.ProductFavList.set(updatedList);
            // console.log(res);
            this._FavoriteService.numOfFav.set(res.data.length)
            this.deletedProduct.emit();
            this._ToastrService.success(res.message);
            }
        });
      }
    });
  }



}
