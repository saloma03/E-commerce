import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslationService {


  constructor(
   private _TranslateService:TranslateService ,
   @Inject(PLATFORM_ID) private platId:object ,

    ) {


    if(isPlatformBrowser(this.platId)){ // Browser
       // this language will be used as a fallback when a translation isn't found in the current language this._TranslateService.setDefaultLang(  'en'  );
         this._TranslateService.setDefaultLang('en')

         const savedLang  = localStorage.getItem('lang');

         if(savedLang){
           this._TranslateService.use(  savedLang  );
         }

         this.changeDirection()
    }

   }


   changeDirection():void {
    if(localStorage.getItem('lang') === 'en'){
          // dir ltr
          document.dir = 'ltr';
    }
    else if (localStorage.getItem('lang') === 'ar') {
      //dir rtl
      document.dir = 'rtl';

    }


   }


   changeLang(lang : string):void {
      if(isPlatformBrowser(this.platId)){
        localStorage.setItem('lang'  , lang);
      }

      this._TranslateService.use(lang);
      this.changeDirection();
   }



}
