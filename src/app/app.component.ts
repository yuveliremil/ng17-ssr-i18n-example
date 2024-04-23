import { Component, Inject, LOCALE_ID, afterRender, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RegisterIconsService } from './services/register-icons.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = $localize`SSR&i18n Angular application`;
  public icon = 'assets/img/flag_with_trident.svg';
  public activeLocale: 'en-US' | 'uk' = 'en-US';
  constructor(
    private _registerIconsService: RegisterIconsService,
    @Inject(LOCALE_ID) private _locale: string
  ) {
    this._registerIconsService.registerIcons(['trident']);
    this.activeLocale = this._locale as 'en-US' | 'uk'; 
  }
  public changeLanguage2(language: string): void {
    const pathArray = window.location.pathname.split('/');
    const currentLanguage = pathArray[2];
    if (currentLanguage !== language) {
      pathArray[2] = language;
      const newPath = pathArray.join('/');
      window.location.href = newPath;
    }
  }

  ngOnInit() {
    // this.changeLanguage('en');
  }

  public changeLanguage(language: string): void { 
    const supportedLocales = ['/uk/', '/es/', '/fr/'];
    let url = location.href; 
    const regex = /(\/uk\/|\/es\/|\/fr\/)/;
    const match = url.match(regex);
    if (match) {
      const extractedLocale = match[1];  
      if (language == 'en') {
        url = location.href.replace(extractedLocale, '/');
      } 
      
      else if (supportedLocales.includes(extractedLocale)) {
        url = location.href.replace(extractedLocale, `/${language}/`);
      }
 
    } else { 
      if (language !== 'en') {
        const projectName = 'intro'; 

        if (projectName) {
          url = location.href.replace(`/${projectName}`, `/${projectName}/${language}`); 
        } else {
          url = location.href.replace('/', `/${language}`); 
        }

      
      }
    } 
    location.href = url;
  } 

  public isLanguageChangeAvailable(): boolean {
    return !isDevMode();
  }
}
