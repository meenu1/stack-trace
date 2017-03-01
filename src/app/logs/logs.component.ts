import { Component, OnInit } from '@angular/core';

import { LogsService } from './logs.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  private exceptionList: any[] = [];

  constructor(private logsService: LogsService) { }

  ngOnInit() {
    /*this.exceptionList = [
        {
            "shortDesc": "exception shortDesc 1",
            "id": "1"
        },
        {
            "shortDesc": "exception shortDesc 2",
            "id": "2"
        }
    ];*/

    this.logsService.getExceptionList().subscribe((repsonse) => {
      console.info("repsonse:", repsonse);

      this.exceptionList = repsonse.exceptionList;
    });
  }

}
