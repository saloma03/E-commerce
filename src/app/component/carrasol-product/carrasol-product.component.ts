import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, Input, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Iproduct } from '../../core/interfaces/iproduct';
import { ProductService } from '../../core/services/product.service';
import { ProductComponent } from "../product/product.component";
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-carrasol-product',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './carrasol-product.component.html',
  styleUrl: './carrasol-product.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarrasolProductComponent implements OnInit , OnDestroy{
  private readonly _ProductService = inject(ProductService);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID)
  @Input() startSlice! : number;
  @Input() endSlice! : number;


  productList:Iproduct[] = [];
  allProduct!: Subscription;
  slidesPerView: number = 4;  // Default value


  ngOnInit(): void {

      this.allProduct = this._ProductService.getAllProduct().subscribe(
            {
              next: (res)=>{
                this.productList = res.data;
              },
              error:(err) =>{
                console.log(err);
              }
            }
      )
      if(isPlatformBrowser( this._PLATFORM_ID)){
        window.addEventListener('resize', this.updateSlidesPerView.bind(this));

      }

  }
  private updateSlidesPerView(): void {
    if(isPlatformBrowser( this._PLATFORM_ID)){
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1200) {
        this.slidesPerView = 4;
      } else if (screenWidth >= 992) {
        this.slidesPerView = 3;
      } else if (screenWidth >= 768) {
        this.slidesPerView = 2;
      } else {
        this.slidesPerView = 1;
      }

    }
  }


  ngOnDestroy(): void {
      this.allProduct.unsubscribe();
  }
}
