import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-match-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './match-list.component.html',
  styleUrl: './match-list.component.scss',
})
export class MatchListComponent implements OnInit {

  matches: any[] = [
    {
      matchDate: +new Date('2024-01-01'),
      localTeam: 'Team A',
      visitorTeam: 'Team B',
      result: '2-1',
      status: 'finished'
    },
    {
      matchDate: +new Date('2024-01-02'),
      localTeam: 'Team C',
      visitorTeam: 'Team D',
      result: '0-0',
      status: 'ongoing'
    },
    // Add more matches here
  ];

  ngOnInit(): void { }

}
