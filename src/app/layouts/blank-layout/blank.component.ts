import { Component } from '@angular/core';
import { BlankNavbarComponent } from "../../component/blank-navbar/blank-navbar.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../component/footer/footer.component";

@Component({
  selector: 'app-blank',
  standalone: true,
  imports: [BlankNavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.scss'
})
export class BlankComponent {
}
