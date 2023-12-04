import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { AccountInfo } from 'src/app/Model/account-info';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/local/sidebar.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { ProfileDialogComponent } from '../dialog/profile-dialog/profile-dialog.component';
import { RoleAccount } from 'src/app/Model/enum/roleEnum';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit{
  userData!: AccountInfo;
  ROLE = RoleAccount
  isLogin = false;
  isShowNotification = false;
  notificationList: any[] = [];
  userId = this.authService.getUser()._id;
  unreadNotificationCount = 0;
  userRole = this.authService.getUser()?.role;

  constructor(
    public sidebarService: SidebarService,
    private authService: AuthService,
    private showToast: ToastService,
    private dialog: MatDialog,
    private router: Router,
    private notificationsService: NotificationsService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.userData = this.authService.getUser();
    this.isLogin = this.authService.isLogin();

    this.loadNotification();
    this.onListenNotification();
    this.listenMessages();
  }

  onLogout(): void {
    this.showToast.confirmHandle(
      'Bạn có chắc chắn muốn đăng xuất?',
      this.authService.logout.bind(this.authService)
    );
  }

  onOpenProfile(): void {
    const profileDialog = this.dialog.open(ProfileDialogComponent);
    profileDialog.afterClosed().subscribe((result) => {
        this.userData = this.authService.getUser();
    });
  }

  onNavigateChat(): void {
    this.router.navigate(['/chat']);
  }

  onUnreadNotification(unreadNotice: any): void {
    this.unreadNotificationCount = unreadNotice;
  }

  loadNotification(){
    this.notificationsService.getNotifications(this.userId).subscribe({
      next: (res) => {
        this.notificationList = res;
        this.unreadNotificationCount = this.notificationList.filter((notification: any) => !notification.isRead).length;
      }
    })
  }
  onListenNotification(){
    this.notificationsService.getNewNotification().subscribe({
      next: (res) => {
        this.showToast.showNoticeToast('Bạn có thông báo mới');
        this.loadNotification();
      }
    })
  }

  listenMessages() {
    return this.chatService.getMessage().subscribe((data: any) => {
      //get Current Route
      const currentRoute = this.router.url;
      const isChatPage = currentRoute.includes('chat');

      if(!isChatPage){
        this.showToast.showNoticeToast('Bạn có tin nhắn mới');
      }
    });
  }

  onNewNotification(isHasNew: boolean){
    if(isHasNew){
      this.showToast.showNoticeToast('Bạn có thông báo mới');
    }

  }
}
