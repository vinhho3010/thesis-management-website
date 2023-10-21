// Angular
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

/**
 * Sanitize HTML
 */
@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
  /**
   * Pipe Constructor
   *
   * @param _sanitizer: DomSanitezer
   */
  // tslint:disable-next-line
  constructor(protected _sanitizer: DomSanitizer) {
  }

  /**
   * Transform
   *
   * @param value: string
   * @param type: string
   */
  transform(value: string | undefined, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html':
        return this._sanitizer.bypassSecurityTrustHtml(value as string);
      case 'style':
        return this._sanitizer.bypassSecurityTrustStyle(value as string);
      case 'script':
        return this._sanitizer.bypassSecurityTrustScript(value as string);
      case 'url':
        return this._sanitizer.bypassSecurityTrustUrl(value as string);
      case 'resourceUrl':
        return this._sanitizer.bypassSecurityTrustResourceUrl(value as string);
      default:
        return this._sanitizer.bypassSecurityTrustHtml(value as string);
    }
  }
}
