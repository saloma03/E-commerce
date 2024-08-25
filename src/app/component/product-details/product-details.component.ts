import { Iproduct } from './../../core/interfaces/iproduct';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe,NgClass],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductDetailsComponent implements OnInit{
  private readonly _ProductService = inject(ProductService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);

  favorite : boolean = false;
  productDetails: Iproduct | null = null;
  getMoreDetails : boolean = false;
  getReviews : boolean = true;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(
      (p)=>{
        let productId = p.get('id');
        this._ProductService.getspeceficProduct(
          productId).subscribe({
          next: (res)=>{
            this.productDetails = res.data;
            console.log(this.productDetails)
          },
          error:(err)=>{
            console.log(err)
          }
        })
      })

  }

}
