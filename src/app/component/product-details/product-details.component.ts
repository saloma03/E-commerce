import { CurrencyPipe, isPlatformBrowser, NgClass, NgStyle } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, PLATFORM_ID } from '@angular/core';
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

  productDetails: Iproduct | null = null;
  getMoreDetails : boolean = false;
  getReviews : boolean = true;
  isloading:boolean = false;
  private readonly _PLATFORM_ID = inject(PLATFORM_ID)
  fullStars: number[] = [];
  emptyStars: number[] = [];
  hasPartialStar = false;
  partialStarGradient = '';
  slidesPerView: number = 4;

  isProductInFavorites!: boolean;


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(
      (p)=>{
        let productId = p.get('id');
        this._ProductService.getspeceficProduct(
          productId).subscribe({
          next: (res)=>{
            this.productDetails = res.data;
            // console.log(this.productDetails)
            this.isProductInFavorites = this._FavoriteService.ProductFavList().some((p) => p._id === this.productDetails!._id);
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
      if (isPlatformBrowser(this._PLATFORM_ID)) {
        window.addEventListener('resize', this.updateSlidesPerView.bind(this));  // Listen for resize events
        this.updateSlidesPerView();  // Set slidesPerView based on initial screen size
      }


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
    this._FavoriteService.addToWishList(id).subscribe({
      next:(res)=>{
        this._FavoriteService.numOfFav.set(res.data.length)
        this._ToastrService.success(res.message);
        this.isProductInFavorites = true;

        // console.log(res)
      }
    })

  }

  removeFavorite(id:string):void{
    this._FavoriteService.deleteFromWishList(id).subscribe({
      next:(res)=>{
        this._ToastrService.show(res.message);
        this.isProductInFavorites = false;
      }
    })
  }

  private updateSlidesPerView(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1200) {
        this.slidesPerView = 4;  // 4 slides for large screens
      } else if (screenWidth >= 992) {
        this.slidesPerView = 3;  // 3 slides for medium screens
      } else if (screenWidth >= 768) {
        this.slidesPerView = 2;  // 2 slides for small screens
      } else {
        this.slidesPerView = 1;  // 1 slide for very small screens
      }
    }
  }

}




