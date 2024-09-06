import { Iproduct } from './../../core/interfaces/iproduct';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, NgClass } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { log } from 'console';
import { FavoriteService } from '../../core/services/favorite.service';
import { CarrasolProductComponent } from "../carrasol-product/carrasol-product.component";
import { finalize } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe, NgClass, CarrasolProductComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductDetailsComponent implements OnInit{
  private readonly _ProductService = inject(ProductService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _FavoriteService = inject(FavoriteService)
  private readonly _CartService = inject(CartService);

  favorite : boolean = false;
  productDetails: Iproduct | null = null;
  getMoreDetails : boolean = false;
  getReviews : boolean = true;
  isloading:boolean = false;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(
      (p)=>{
        let productId = p.get('id');
        this._ProductService.getspeceficProduct(
          productId).subscribe({
          next: (res)=>{
            this.productDetails = res.data;
            // console.log(this.productDetails)
          }
        })
      })

  }

  addToBag(id:string):void{
    this.isloading = true;
      this._CartService.addProductToCart(id).pipe(
        finalize(() => {
          this.isloading = false;
        })
      ).subscribe({
        next: (res)=>{
          this._CartService.numOfCart.set(res.numOfCartItems)
          this.isloading = false;
            // console.log(res);

        }
      })

  }

  addToFavorite(id:string):void{
    if(this.favorite){
      this._FavoriteService.addToWishList(id).subscribe({
        next:(res)=>{
          this._FavoriteService.numOfFav.set(res.count)

          // console.log(res)
        }
      })
    }

  }

}
