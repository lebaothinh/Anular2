import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class StudentsmanagementService {

  constructor(private http: Http) { }
  getData(url: string) {
    return this.http.get(url)
      .map((response: Response) => response.json())
  }
  sendPostForm(url: string, value) {
    const headers = new Headers({ 'Content-Type': 'application.json' });
    const body = JSON.stringify(value);
    return this.http.post(url, body, { headers })
      .toPromise()
      .then(res => res.json())
  }
  sendPutForm(url: string, value) {
    const headers = new Headers({ 'Content-Type': 'application.json' });
    const body = JSON.stringify(value);
    return this.http.put(url, body, { headers })
      .toPromise()
      .then(res => res.json())
  }

  sendDeleteForm(url: string, value) {
    const body = JSON.stringify(value);
    return this.http.delete(url, body)
      .toPromise()
      .then(res => res.json())
  }
}
