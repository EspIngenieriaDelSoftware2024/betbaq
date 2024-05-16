import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LeagueTableComponent } from '../../../shared/components/league-table';
import { CardTeamCreateComponent } from '../../../shared/components/dashboard';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    RouterLink,

    LeagueTableComponent,
    CardTeamCreateComponent
  ],
  templateUrl: './dashboard-list.component.html',
  styleUrl: './dashboard-list.component.scss',
})
export class DashboardListComponent implements OnInit {

  ngOnInit(): void { }

}
