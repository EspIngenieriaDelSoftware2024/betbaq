import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InitService } from './shared/services/init/init.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'betbaq';

  constructor(
    private readonly _initService: InitService,
  ) { }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this._initService.initData();
  }
}
