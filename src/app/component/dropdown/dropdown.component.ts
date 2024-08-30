import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Iproduct } from '../../core/interfaces/iproduct';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  @Input() bId !: string;
  @Input() mId !:string;
  @Input() buttonName !:string;
  @Input() menu !:string[];
  @Input() p !: Iproduct[];

  @Output() filteredProducts = new EventEmitter<Iproduct[]>();

  dropdowns : boolean =false;

  toggleDropdown() {
    this.dropdowns = !this.dropdowns;
  }

  filter(category: string): void {
    let sortedProducts:Iproduct[] = [];
    if (category === 'Top Price') {
      sortedProducts = this.p.sort((a, b) => b.price - a.price);
    } else if (category === 'Low Price') {
      sortedProducts = this.p.sort((a, b) => a.price - b.price);
    } else if (category === 'By Sold') {
      sortedProducts = this.p.sort((a, b) => b.sold - a.sold);
    }
    this.filteredProducts.emit(sortedProducts);
  }
}
