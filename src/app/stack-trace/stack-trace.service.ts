import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class StackTraceService {

  constructor(private http: Http) { }

  getSourceCode(file: string) {
    return this.http.get('assets/stub-data/App.java.json')
      .map((res: Response) => {
        return res.json();
      });

  }

  getValue(keyword: string) {
    return this.http.get('assets/stub-data/values.json')
      .map((res: Response) => {
        return res.json();
      });

  }

}