import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProxyService {
  constructor(private http: HttpClient) {}

  getPdf(): Observable<Blob> {
    return this.http.get('/api/images/default/sample.pdf', {
      responseType: 'blob',
    });
  }
}
