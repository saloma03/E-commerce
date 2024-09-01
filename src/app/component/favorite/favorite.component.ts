import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { FavoriteService } from '../../core/services/favorite.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { ProductComponent } from "../product/product.component";
import { CarrasolProductComponent } from "../carrasol-product/carrasol-product.component";
import { DropdownComponent } from "../dropdown/dropdown.component";

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [ProductComponent, CarrasolProductComponent, DropdownComponent],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss'
})
export class FavoriteComponent  implements OnInit{
  categoryList !: Icategory[];
  categoryTitles!: string[];

  favoriteProduct !: Iproduct[];
  sortedList !: Iproduct[];
  constructor(private _FlowbiteService:FlowbiteService , private _CategoriesService : CategoriesService , private _FavoriteService:FavoriteService){

  }
  ngOnInit(): void {
    this._FlowbiteService.loadFlowbite((flow)=>{});
    this._CategoriesService.getCategories().subscribe({
      next:(res)=>{
        this.categoryList = res.data;
        this.categoryTitles = this.categoryList.map(category => category.name);
        console.log(this.categoryTitles);
      }
    })
    this._FavoriteService.getUserWishList().subscribe({
      next:(res)=>{
        this.favoriteProduct = res.data;
        this.sortedList = this.favoriteProduct;
      }
    })

  }
  updateFilteredList(filteredProducts: Iproduct[]) {
    this.sortedList = filteredProducts;
  }
}
