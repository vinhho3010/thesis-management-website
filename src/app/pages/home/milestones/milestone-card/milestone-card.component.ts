import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-milestone-card',
  templateUrl: './milestone-card.component.html',
  styleUrls: ['./milestone-card.component.scss']
})
export class MilestoneCardComponent {
  @Input() milestone: any;
  @Output() deleteMilestone = new EventEmitter<any>();
  @Output() editeMilestone = new EventEmitter<any>();

  constructor(private router: Router) { }

  onDeleteMilestone(event: any) {
    event.stopPropagation();
    this.deleteMilestone.emit(this.milestone);
  }

  onEditeMilestone(event: any) {
    event.stopPropagation();
    this.editeMilestone.emit(this.milestone);
  }

  onNavigateToMilestone() {
    this.router.navigate(['/milestones', this.milestone._id]);
  }

}
