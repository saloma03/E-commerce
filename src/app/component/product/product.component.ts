import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input, OnInit, ElementRef } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { SlicenamePipe } from '../../core/pipes/slicename.pipe';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SlicenamePipe , CurrencyPipe , RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductComponent {

  // private readonly _ProductService = inject(ProductService);

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

}
