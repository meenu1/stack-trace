import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LogsService {

  constructor(private http: Http) { }

  getExceptionList() {
    let url = '/list';
    url = 'assets/stub-data/exception-list.json';
    return this.http.get(url)
      .map((res: Response) => {
        return res.json();
      });

  }


}