import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ServerService {
  private url_base: string = 'https://ng-http-e1922.firebaseio.com';
  private url_data: string = this.url_base + '/data.json';
  constructor(private http: Http) {}

  storeServers(servers: any[]) {
    // const headers = new Headers({ 'Content-Type': 'application/json' });
    // return this.http.post(this.url, servers, { headers });
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put(this.url_data, servers, { headers });
  }

  getServers() {
    return this.http.get(this.url_data).pipe(
      map((response: Response) => {
        const data = response.json();
        for (const server of data) {
          server.name = 'FETECHED_' + server.name;
        }
        return data;
      }),
      catchError(error => throwError('Something went wrong'))
    );
  }

  getAppName() {
    return this.http.get(this.url_base + '/appName.json').pipe(
      map((response: Response) => {
        return response.json();
      })
    );
  }
}
