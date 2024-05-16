import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { LeagueTableComponent } from '../../../shared/components/league-table';

@Component({
  selector: 'app-league-list',
  standalone: true,
  imports: [
    CommonModule,
    LeagueTableComponent
  ],
  templateUrl: './league-list.component.html',
  styleUrl: './league-list.component.scss',
})
export class LeagueListComponent implements OnInit {

  ngOnInit(): void { }

}
