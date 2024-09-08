import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CarrasolProductComponent } from "../carrasol-product/carrasol-product.component";
import { ProductComponent } from "../product/product.component";
import { TitleComponent } from "../title/title.component";
import { CategorySliderComponent } from "./category-slider/category-slider.component";
import { MainCarrasolComponent } from "./main-carrasol/main-carrasol.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainCarrasolComponent, TranslateModule,CategorySliderComponent, TitleComponent, ProductComponent, CarrasolProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {

}
