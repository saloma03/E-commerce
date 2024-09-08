import { CurrencyPipe, NgClass, NgStyle } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { FavoriteService } from '../../core/services/favorite.service';
import { ProductService } from '../../core/services/product.service';
import { CarrasolProductComponent } from "../carrasol-product/carrasol-product.component";
import { Iproduct } from './../../core/interfaces/iproduct';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe, NgClass, NgStyle,CarrasolProductComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductDetailsComponent implements OnInit{
  private readonly _ProductService = inject(ProductService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _FavoriteService = inject(FavoriteService)
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  favorite : boolean = false;
  productDetails: Iproduct | null = null;
  getMoreDetails : boolean = false;
  getReviews : boolean = true;
  isloading:boolean = false;

  fullStars: number[] = [];
  emptyStars: number[] = [];
  hasPartialStar = false;
  partialStarGradient = '';



  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(
      (p)=>{
        let productId = p.get('id');
        this._ProductService.getspeceficProduct(
          productId).subscribe({
          next: (res)=>{
            this.productDetails = res.data;
            // console.log(this.productDetails)
            if (this.productDetails && this.productDetails.ratingsAverage) {
              const rating = this.productDetails.ratingsAverage;
              const fullStarCount = Math.floor(rating);
              const hasFraction = rating % 1 !== 0;

              this.fullStars = Array(fullStarCount).fill(0);
              this.emptyStars = Array(5 - fullStarCount - (hasFraction ? 1 : 0)).fill(0);

              if (hasFraction) {
                this.hasPartialStar = true;
                const percentage = (rating % 1) * 100;
                this.partialStarGradient = `linear-gradient(90deg, #FBBF24 ${percentage}%, #D1D5DB ${percentage}%)`;
              } else {
                this.hasPartialStar = false;
              }
            }

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
          this._FavoriteService.numOfFav.set(res.data.length)
          this._ToastrService.success(res.message);

          // console.log(res)
        }
      })
    }

  }


}




