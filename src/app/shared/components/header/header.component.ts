import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AccountInfo } from 'src/app/Model/account-info';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/local/sidebar.service';
import { ToastService } from 'src/app/services/local/toast.service';

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
    private showToast: ToastService
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
}
