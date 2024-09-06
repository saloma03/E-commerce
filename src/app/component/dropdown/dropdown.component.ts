import { Component, Input, Output, EventEmitter, WritableSignal } from '@angular/core';
import { Iproduct } from '../../core/interfaces/iproduct';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() bId!: string;
  @Input() mId!: string;
  @Input() buttonName!: string;
  @Input() menu!: string[];
  @Input() p!: WritableSignal<Iproduct[]>; // Pass product list as a signal

  @Output() filteredProducts = new EventEmitter<Iproduct[]>(); // Emit sorted products to parent

  dropdowns: boolean = false;

  toggleDropdown() {
    this.dropdowns = !this.dropdowns;
  }

  filter(category: string): void {
    let sortedProducts: Iproduct[] = [...this.p()];

    if (category === 'Top Price') {
      sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
    } else if (category === 'Low Price') {
      sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
    } else if (category === 'By Sold') {
      sortedProducts = sortedProducts.sort((a, b) => b.sold - a.sold);
    } else if (category == 'all') {
      sortedProducts = [...this.p()];
    } else {
      sortedProducts = sortedProducts.filter((item) =>
        item.category.name.includes(category)
      );
    }

    this.filteredProducts.emit(sortedProducts);
  }


}
