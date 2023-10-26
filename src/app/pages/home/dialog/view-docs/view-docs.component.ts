import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-view-docs',
  templateUrl: './view-docs.component.html',
  styleUrls: ['./view-docs.component.scss']
})
export class ViewDocsComponent  {
  url: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.url = this.data?.url;
  }

  // ngOnInit(): void {
  //   if(this.data?.url) {
  //     this.url = this._sanitizer.bypassSecurityTrustResourceUrl(this.data?.url);
  //   }
  // }
}
