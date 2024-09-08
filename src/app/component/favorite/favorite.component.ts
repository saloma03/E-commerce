import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { FavoriteService } from '../../core/services/favorite.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { ProductComponent } from "../product/product.component";
import { CarrasolProductComponent } from "../carrasol-product/carrasol-product.component";
import { DropdownComponent } from "../dropdown/dropdown.component";
import { NgxSpinnerService } from 'ngx-spinner';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [ProductComponent, CarrasolProductComponent, DropdownComponent , RouterLink],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss'
})
export class FavoriteComponent  implements OnInit{
  categoryList :WritableSignal<Icategory[]> = signal<Icategory[]>([]);
  categoryTitles:WritableSignal<string[]> = signal<string[]>([]);

  favoriteProduct:WritableSignal<Iproduct[]> = signal<Iproduct[]>([]);
  sortedList:WritableSignal<Iproduct[]> = signal<Iproduct[]>([]);
  constructor(private _FlowbiteService:FlowbiteService , private _CategoriesService : CategoriesService , private _FavoriteService:FavoriteService){

  }
  ngOnInit(): void {
    this._FlowbiteService.loadFlowbite((flow)=>{});
    this._CategoriesService.getCategories().subscribe({
      next:(res)=>{
        this.categoryList.set(res.data) ;
        this.categoryTitles.set(this.categoryList().map(category => category.name));
      }
    })
    this._FavoriteService.getUserWishList().subscribe({
      next:(res)=>{
        this.favoriteProduct.set(res.data) ;
        this.sortedList.set(this.favoriteProduct()) ;
      }
    })

  }
  loadFavoriteProducts(): void {

    this._FavoriteService.getUserWishList().subscribe({
      next: (res) => {
        this.favoriteProduct.set(res.data);
        this.sortedList.set(this.favoriteProduct()) ;
        console.log("weeeee" , res.data);
      },
    });
  }

  refreshFavoriteList(): void {
    this.loadFavoriteProducts();
  }
  addrefresh(): void {
    this.loadFavoriteProducts();
  }



  onFilterProducts(sortedProducts: Iproduct[]): void {
    this.sortedList.set([...sortedProducts]);
  }


}
