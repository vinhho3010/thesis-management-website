import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-milestone-card',
  templateUrl: './milestone-card.component.html',
  styleUrls: ['./milestone-card.component.scss']
})
export class MilestoneCardComponent implements OnInit {
  @Input() milestone: any;
  @Output() deleteMilestone = new EventEmitter<any>();
  @Output() editeMilestone = new EventEmitter<any>();
  submittedStudentCount = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.countSubmittedStudent();
  }

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

  countSubmittedStudent() {
    this.milestone.thesisVersionList.forEach((version: any) => {
      if (version.url) {
        this.submittedStudentCount++;
      }
    })
  }

}
