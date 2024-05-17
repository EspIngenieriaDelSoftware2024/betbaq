import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { UserModel } from '../../../shared/models/dbo/user/user.model';
@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.scss',
})
export class HomeDashboardComponent implements OnInit {

  currentUser!: UserModel;

  firstName: string = 'Admin';
  nameApp: string = '@betbaq';

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const currentUser = this._authService.getSession();
    if (currentUser) this.currentUser = currentUser;
  }

  logout() {
    this._authService.removeSession();
    this._router.navigate(['/login']);
  }

}
