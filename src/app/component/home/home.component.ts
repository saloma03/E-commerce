import { Component , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MainCarrasolComponent } from "./main-carrasol/main-carrasol.component";
import { CategorySliderComponent } from "./category-slider/category-slider.component";
import { TitleComponent } from "../title/title.component";
import { ProductComponent } from "../product/product.component";
import { CarrasolProductComponent } from "../carrasol-product/carrasol-product.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainCarrasolComponent, CategorySliderComponent, TitleComponent, ProductComponent, CarrasolProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {

}
