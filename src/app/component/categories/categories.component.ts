import { Component, inject } from '@angular/core';
import { Icategory } from '../../core/interfaces/icategory';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  categoriesList: Icategory[] = [];
  private readonly _CategoriesService=inject(CategoriesService)
  ngOnInit(): void {
    this._CategoriesService.getCategories().subscribe({
      next:(res)=>{
        this.categoriesList = res.data;
      }
    })
  }
}
