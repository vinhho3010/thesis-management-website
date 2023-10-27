import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailThesisDialogComponent } from '../../dialog/detail-thesis-dialog/detail-thesis-dialog.component';
import { ThesisService } from 'src/app/services/thesis.service';
import { ToastService } from 'src/app/services/local/toast.service';

@Component({
  selector: 'app-thesis-card-public',
  templateUrl: './thesis-card.component.html',
  styleUrls: ['./thesis-card.component.scss']
})
export class ThesisCardComponent {
@Input() thesis: any;
@Output() onViewThesis = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private thesisService: ThesisService,
    private toastService: ToastService
  ) { }

  ngOnInit(

  ): void {
  }

  onView(thesis: any){
    this.onViewThesis.emit(thesis);
  }
}
