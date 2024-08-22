import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-blank-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './blank-navbar.component.html',
  styleUrl: './blank-navbar.component.scss'
})
export class BlankNavbarComponent implements OnInit{
    constructor(private _FlowbiteService:FlowbiteService){

    }
    private _PLATFORM_ID = inject(PLATFORM_ID);
    private _Router = inject(Router);
    private _AuthenticationService = inject(AuthenticationService)
    logout():void{
      if(isPlatformBrowser(this._PLATFORM_ID)){
        localStorage.removeItem('userToken');
      }
      this._AuthenticationService.userData = null;
      this._Router.navigate(['/login']);
    }
    ngOnInit(): void {
        this._FlowbiteService.loadFlowbite((flowbit)=>{})
    }

}
