import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ServerService {
  private url: string = 'https://ng-http-e1922.firebaseio.com/data.json';
  constructor(private http: Http) {}

  storeServers(servers: any[]) {
    // const headers = new Headers({ 'Content-Type': 'application/json' });
    // return this.http.post(this.url, servers, { headers });
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put(this.url, servers, { headers });
  }

  getServers() {
    return this.http.get(this.url).pipe(
      map((response: Response) => {
        const data = response.json();
        return data;
      })
    );
  }
}
