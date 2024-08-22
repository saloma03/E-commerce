import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories.service';
import { Icategory } from '../../../core/interfaces/icategory';
import { TitleComponent } from "../../title/title.component";

// Install Swiper modules



@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [TitleComponent],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class CategorySliderComponent implements OnInit{

  private readonly _CategoriesService = inject(CategoriesService);

  categoryList : Icategory[] | null = null ;
  ngOnInit(): void {
    this._CategoriesService.getCategories().subscribe(
      {
        next:(res)=>{
          this.categoryList = res.data;
          console.log(this.categoryList);
        },
        error:(err)=>{
          console.log(err)
        }
      }
    )
  }

}