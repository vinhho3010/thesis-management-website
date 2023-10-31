import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { AccountInfo } from 'src/app/Model/account-info';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/local/sidebar.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { ProfileDialogComponent } from '../dialog/profile-dialog/profile-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit{
  userData!: AccountInfo;
  isLogin = false;

  constructor(
    public sidebarService: SidebarService,
    private authService: AuthService,
    private showToast: ToastService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.userData = this.authService.getUser();
    this.isLogin = this.authService.isLogin();
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
}
