import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PendingStatus } from 'src/app/Model/enum/pendingStatus';
import { RegisteredTopic } from 'src/app/Model/registerTopic/registerTopic';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pending-card',
  templateUrl: './pending-card.component.html',
  styleUrls: ['./pending-card.component.scss']
})
export class PendingCardComponent {
@Input() pending!: RegisteredTopic
@Output() onEdit = new EventEmitter<RegisteredTopic>();
@Output() onCancel = new EventEmitter<RegisteredTopic>();
PENDING_STATUS = PendingStatus;

constructor(private router: Router, private authService: AuthService){}

onEditTopic(pending: RegisteredTopic) {
  this.onEdit.emit(pending)
}

cancelRegister(pending: RegisteredTopic) {
  this.onCancel.emit(pending);
}

onClickCard() {
  if(this.pending.status === this.PENDING_STATUS.APPROVED){
    this.router.navigate([`class/`])
  } else {
    return;
  }
}
}
