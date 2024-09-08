import { isPlatformBrowser, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, computed, ElementRef, inject, NgZone, OnInit, PLATFORM_ID, signal, Signal, ViewChild, WritableSignal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthenticationService } from '../../core/services/authentication.service';
import { CartService } from '../../core/services/cart.service';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { MyTranslationService } from '../../core/services/mytranslate.service';
import { FavoriteService } from '../../core/services/favorite.service';

@Component({
  selector: 'app-blank-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule , NgClass],
  templateUrl: './blank-navbar.component.html',
  styleUrls: ['./blank-navbar.component.scss']
})
export class BlankNavbarComponent implements OnInit {
  private _PLATFORM_ID = inject(PLATFORM_ID);
  private _Router = inject(Router);
  private _AuthenticationService = inject(AuthenticationService);
  private _MyTranslationService = inject(MyTranslationService);
  private _CartService = inject(CartService);
  private _FavoriteService = inject(FavoriteService);

  numberOfCart: Signal<number> = computed(() => this._CartService.numOfCart());
  numberOfFAvorite: Signal<number> = computed(() => this._FavoriteService.numOfFav());

  isMenuOpen: WritableSignal<boolean> = signal(false);
  drawerVisible: boolean = false;

  constructor(
    private _FlowbiteService: FlowbiteService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._FlowbiteService.loadFlowbite((flow) => {});

    this._CartService.getUserCart().subscribe({
      next: (res)=> {
        this._CartService.numOfCart.set(res.numOfCartItems);
      }
    })

    this._FavoriteService.getUserWishList().subscribe({
      next:(res)=>{
        console.log("favvvov" , res)
        this._FavoriteService.numOfFav.set(res.count);
        this._FavoriteService.ProductFavList.set(res.data)

      }
    })
  }

  logout(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      localStorage.removeItem('userToken');
    }
    this._AuthenticationService.userData = null;
    this._Router.navigate(['/login']);
  }

  showSearchBar() {
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
    this._MyTranslationService.changeLang(lang);
    this.cdr.markForCheck(); // Ensure Angular picks up the changes
  }
  openMenue() : void{
    this.isMenuOpen.set(!this.isMenuOpen())
  }
}
