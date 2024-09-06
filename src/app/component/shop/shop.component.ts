import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Icategory } from '../../core/interfaces/icategory';
import { CategoriesService } from '../../core/services/categories.service';
import { ProductService } from '../../core/services/product.service';
import { DropdownComponent } from "../dropdown/dropdown.component";
import { ProductComponent } from "../product/product.component";
import { Iproduct } from './../../core/interfaces/iproduct';
import { SearchPipe } from '../../core/pipes/search.pipe';

@Component({
  selector: 'app-shop',
  standalone: true,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  imports: [ProductComponent, DropdownComponent, FormsModule , SearchPipe],
})
export class ShopComponent implements OnInit {
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _ProductService = inject(ProductService);

  catList:WritableSignal<Icategory[]> = signal<Icategory[]>([]);
  catName:string[] = [];


  productList:WritableSignal<Iproduct[]> = signal([]); // This holds the original product list
  filteredProductList:WritableSignal<Iproduct[]> = signal<Iproduct[]>([]); // This holds the filtered list
  textSearch:WritableSignal<string> = signal<string>('');


  ngOnInit(): void {
    this._CategoriesService.getCategories().subscribe({
      next: (res) => {
        this.catList.set(res.data);
        this.catName = this.catList().map((category) => category.name);
      },
    });

    this._ProductService.getAllProduct().subscribe({
      next: (res) => {
        this.productList.set(res.data);

        this.filteredProductList.set(this.productList()); // Initialize with all products
      },
    });


  }

  filterProduct(categoryName: string) {
    const filtered = this.productList().filter((item) =>
      item.category.name.includes(categoryName)
    );

    this.filteredProductList.set(filtered); // Set the filtered products to the signal
    console.log(this.filteredProductList());
  }
  onFilterProducts(sortedProducts: Iproduct[]): void {
    this.filteredProductList.set([...sortedProducts]); // Update the displayed products
  }
}
