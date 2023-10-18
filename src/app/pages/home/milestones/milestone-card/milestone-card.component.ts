import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-milestone-card',
  templateUrl: './milestone-card.component.html',
  styleUrls: ['./milestone-card.component.scss']
})
export class MilestoneCardComponent {
  @Input() milestone: any;
  @Output() deleteMilestone = new EventEmitter<any>();
  @Output() editeMilestone = new EventEmitter<any>();

  constructor() { }

  onDeleteMilestone() {
    this.deleteMilestone.emit(this.milestone);
  }

  onEditeMilestone() {
    this.editeMilestone.emit(this.milestone);
  }

}
