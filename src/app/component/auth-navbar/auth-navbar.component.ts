import { Component, inject, WritableSignal, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../core/services/flowbite.service';

@Component({
  selector: 'app-auth-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './auth-navbar.component.html',
  styleUrl: './auth-navbar.component.scss'
})
export class AuthNavbarComponent {

  private readonly _FlowbiteService = inject(FlowbiteService);
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._FlowbiteService.loadFlowbite((flow)=>{})
  }
  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen()) ;
  }

}
