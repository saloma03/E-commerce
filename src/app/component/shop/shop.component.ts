import { Component, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CategoriesService } from '../../core/services/categories.service';
import { ProductService } from '../../core/services/product.service';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Icategory } from '../../core/interfaces/icategory';
import { ProductComponent } from "../product/product.component";
import { DropdownComponent } from "../dropdown/dropdown.component";
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';

@Component({
  selector: 'app-shop',
  standalone: true,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  imports: [ProductComponent, DropdownComponent ,FormsModule , SearchPipe]
})
export class ShopComponent implements OnInit {
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _ProductService = inject(ProductService);

  catList: Icategory[] = [];
  catName!:string[];
  productList: Iproduct[] = [];
  filteredList: Iproduct[] = [];
  sortedList:Iproduct[] = [];
  textSearch:string = "";

  dropdowns : any = {
    statusDropdown: false,
    filterDropdown: false,

  }

  ngOnInit(): void {
    // this._FlowbiteService.loadFlowbite((flow) => {});

    this._CategoriesService.getCategories().subscribe({
      next: (res) => {
        this.catList = res.data;
        this.catName = this.catList.map(category => category.name);
      }
    });

    this._ProductService.getAllProduct().subscribe({
      next: (res) => {
        this.productList = res.data;
        this.filterProduct("Men's Fashion");
      }
    });

    // this._Router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe(() => {
    //   this._FlowbiteService.loadFlowbite((flow) => {});
    // });
  }

  filterProduct(categoryName: string) {
    this.filteredList = this.productList.filter((item) => {
      return item.category.name.includes(categoryName);
    });
  }

  updateFilteredList(filteredProducts: Iproduct[]) {
    this.sortedList = filteredProducts;
  }


  // ngAfterViewChecked(): void {
  //   //Called after every check of the component's or directive's content.
  //   //Add 'implements AfterContentChecked' to the class.
  //   this._FlowbiteService.loadFlowbite((flow) => {});

  // }






}

