import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { FavoriteService } from '../../core/services/favorite.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { ProductComponent } from "../product/product.component";
import { CarrasolProductComponent } from "../carrasol-product/carrasol-product.component";

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [ProductComponent, CarrasolProductComponent],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss'
})
export class FavoriteComponent  implements OnInit{
  categoryList !: Icategory[];
  favoriteProduct !: Iproduct[];
  constructor(private _FlowbiteService:FlowbiteService , private _CategoriesService : CategoriesService , private _FavoriteService:FavoriteService){

  }
  ngOnInit(): void {
    this._FlowbiteService.loadFlowbite((flow)=>{});
    this._CategoriesService.getCategories().subscribe({
      next:(res)=>{
        this.categoryList = res.data;
      }
    })
    this._FavoriteService.getUserWishList().subscribe({
      next:(res)=>{
        this.favoriteProduct = res.data;
      }
    })

  }
}
