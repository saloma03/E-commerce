import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { Iproduct } from '../../core/interfaces/iproduct';
import { ProductService } from '../../core/services/product.service';
import { ProductComponent } from "../product/product.component";

@Component({
  selector: 'app-carrasol-product',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './carrasol-product.component.html',
  styleUrl: './carrasol-product.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarrasolProductComponent {
  private readonly _ProductService = inject(ProductService);

  productList:Iproduct[] = [];

  ngOnInit(): void {
      this._ProductService.getAllProduct().subscribe(
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
}
