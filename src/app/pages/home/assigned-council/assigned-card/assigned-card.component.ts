import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assigned-card',
  templateUrl: './assigned-card.component.html',
  styleUrls: ['./assigned-card.component.scss']
})
export class AssignedCardComponent {
  @Input() council: any;

  constructor(
    private router: Router
  ) { }


  onNavigateToMilestone() {
    this.router.navigate(['/council-list/detail', this.council._id]);
  }
}
