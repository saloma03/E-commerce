import { TranslateModule } from '@ngx-translate/core';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-carrasol',
  standalone: true,
  imports: [TranslateModule , RouterLink],
  templateUrl: './main-carrasol.component.html',
  styleUrl: './main-carrasol.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class MainCarrasolComponent {

}
