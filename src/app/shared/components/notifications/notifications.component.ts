import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NotificationsService } from 'src/app/services/notifications.service';
import { AuthService } from 'src/app/services/auth.service';
import { Notification } from 'src/app/Model/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  animations: [trigger('textAppear', [
    state('hidden', style({ opacity: 0, transform: 'translateY(20px)' })),
    state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
    transition('hidden => visible', animate('400ms ease-in')),
  ])]
})
export class NotificationsComponent implements OnInit {
@Input() isShowNotification: any;
@Output() unreadNotification = new EventEmitter<number>();
textAppearState = 'hidden';
notificationList: Notification[] = [];
userId = this.authService.getUser()._id;

  constructor(
    private notificationsService: NotificationsService,
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.initAnimation();
    this.loadNotification();
    this.listenNotification();
  }

  loadNotification(){
    this.notificationsService.getNotifications(this.userId).subscribe({
      next: (res) => {
        this.notificationList = res;
      }
    })
  }

  clearAllNotification(){
    this.notificationsService.deleteAllNotifications(this.userId).subscribe({
      next: (res) => {
        this.notificationList = [];
      }
    })
  }

  markAllAsRead(){
    this.notificationsService.markAllNotificationsAsRead(this.userId).subscribe({
      next: (res) => {
        this.notificationList.forEach((notification: any) => {
          notification.isRead = true;
        });
        this.unreadNotification.emit(0);
      }
    })
  }

  handleClickNotification(notification: Notification){
    this.router.navigate([notification.linkAction]);
    if(!notification.isRead) {
      this.notificationsService.updateNotification(notification._id, {isRead: true}).subscribe({
        next: (res) => {
          notification.isRead = true;
        }
      });
      this.unreadNotification.emit(this.notificationList.filter((notification: Notification) => !notification.isRead).length - 1);
    }
  }

  initAnimation(){
    setTimeout(() => {
      this.textAppearState = 'visible';
    }, 0);
  }

  listenNotification(){
    return this.notificationsService.getNewNotification().subscribe({
      next: (res) => {
        this.notificationList.unshift(res as Notification);
        this.unreadNotification.emit(this.notificationList.filter((notification: Notification) => !notification.isRead).length);
      }
    })
  }
}
