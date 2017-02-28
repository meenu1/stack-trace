import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  private logs: any[] = [];

  constructor() { }

  ngOnInit() {
    this.logs = [
      {
        "title": "Log 1",
        "url": "log1"
      },
      {
        "title": "Log 2",
        "url": "log2"
      },
      {
        "title": "Log 3",
        "url": "log3"
      },
    ];
  }

}
