import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-thesis-card-public',
  templateUrl: './thesis-card.component.html',
  styleUrls: ['./thesis-card.component.scss']
})
export class ThesisCardComponent {
@Input() thesis: any;
}
