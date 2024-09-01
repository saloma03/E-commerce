import { ChangeDetectorRef, Component, ElementRef, inject, NgZone, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthenticationService } from '../../core/services/authentication.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MyTranslationService } from '../../core/services/mytranslate.service';

@Component({
  selector: 'app-blank-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive , TranslateModule
  ],
  templateUrl: './blank-navbar.component.html',
  styleUrl: './blank-navbar.component.scss'
})
export class BlankNavbarComponent implements OnInit{
    constructor(private _FlowbiteService:FlowbiteService , private zone: NgZone ,private cdr: ChangeDetectorRef){

    }
    private _PLATFORM_ID = inject(PLATFORM_ID);
    private _Router = inject(Router);
    private _AuthenticationService = inject(AuthenticationService);
    private _MyTranslationService = inject(MyTranslationService);

    drawerVisible : boolean = false;
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

    showSearchBar(){
      this.drawerVisible = !this.drawerVisible;
    }

    @ViewChild('drawerNavigation') drawerNavigation!: ElementRef;

    openDrawer() {
      this.drawerNavigation.nativeElement.classList.add('open');
    }

    closeDrawer() {
      this.drawerNavigation.nativeElement.classList.remove('open');
    }

    translate(lang: string) {
      // this.zone.run(() => {
      //     this._MyTranslationService.changeLang(lang);
      //     this.cdr.markForCheck(); // Ensure Angular picks up the changes
      // });
      console.log('Button clicked!');

      if (lang == 'en') {
        console.log('english will translate!')
        this._MyTranslationService.changeLang(lang);

      }else{
        console.log('arabic will translate!')
        this._MyTranslationService.changeLang(lang);

      }

  }


}
