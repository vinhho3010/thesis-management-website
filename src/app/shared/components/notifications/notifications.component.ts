import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NotificationsService } from 'src/app/services/notifications.service';
import { AuthService } from 'src/app/services/auth.service';
import { Notification } from 'src/app/Model/notification';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/local/toast.service';

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
    private router: Router,
    private toastService: ToastService,
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
      },
      error: (err) => {
        this.toastService.showErrorToast('Không tải được thông báo');
      }
    })
  }

  clearAllNotification(){
    this.notificationsService.deleteAllNotifications(this.userId).subscribe({
      next: (res) => {
        this.notificationList = [];
      },
      error: (err) => {
        this.toastService.showErrorToast('Thông báo xoá thất bại');
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
      },
      error: (err) => {
        this.toastService.showErrorToast('Thông báo đánh dấu đã đọc thất bại');
      }
    })
  }

  handleClickNotification(notification: Notification){
    if(this.router.url.includes(notification.linkAction)){
      this.router.navigate(['/home']).then(() => {
        this.router.navigate([notification.linkAction]);
      });
    } else {
      this.router.navigate([notification.linkAction]);
    }

    if(!notification.isRead) {
      this.notificationsService.updateNotification(notification._id, {isRead: true}).subscribe({
        next: (res) => {
          notification.isRead = true;
        },
        error: (err) => {
          this.toastService.showErrorToast('Thông báo đánh dấu đã đọc thất bại');
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

  deleteNotification(event: any, notification: Notification){
    event.stopPropagation();
    this.notificationsService.deleteNotification(notification._id).subscribe({
      next: (res) => {
        this.notificationList = this.notificationList.filter((item: Notification) => item._id !== notification._id);
        this.unreadNotification.emit(this.notificationList.filter((notification: Notification) => !notification.isRead).length);
      },
      error: (err) => {
        this.toastService.showErrorToast('Thông báo xoá thất bại');
      }
    })
  }
}
