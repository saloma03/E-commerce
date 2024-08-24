import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Iproduct } from '../../core/interfaces/iproduct';
import { ProductService } from '../../core/services/product.service';
import { ProductComponent } from "../product/product.component";
import { Subscription } from 'rxjs';

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

  @Input() startSlice! : number;
  @Input() endSlice! : number;

  productList:Iproduct[] = [];
  allProduct!: Subscription;
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
  }

  ngOnDestroy(): void {
      this.allProduct.unsubscribe();
  }
}
