import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDocComponent } from '../../dialog/add-doc/add-doc.component';

@Component({
  selector: 'app-ref-documents',
  templateUrl: './ref-documents.component.html',
  styleUrls: ['./ref-documents.component.scss']
})
export class RefDocumentsComponent {
  constructor(private dialog: MatDialog) { }

  onAddDoc() {
    this.dialog.open(AddDocComponent);
  }
}
