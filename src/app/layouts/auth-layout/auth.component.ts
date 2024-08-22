import { Component } from '@angular/core';
import { AuthNavbarComponent } from "../../component/auth-navbar/auth-navbar.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../component/footer/footer.component";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [AuthNavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
