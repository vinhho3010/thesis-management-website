import { Component, OnInit } from '@angular/core';
import { textAppearAnimation } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [textAppearAnimation],
})
export class LandingComponent implements OnInit {
  textAppearState1 = 'hidden';
  textAppearState2 = 'hidden';

  ngOnInit(): void {
    setTimeout(() => {
      this.textAppearState1 = 'visible';
    }, 200);
    setTimeout(() => {
      this.textAppearState2 = 'visible';
    }, 1000);
  }
}
