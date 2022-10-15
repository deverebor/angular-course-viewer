import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ICourse } from '../model/course';
import { delay, first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private httpClient: HttpClient) {}

  private readonly API = 'api/courses/';

  list() {
    return this.httpClient.get<ICourse[]>(this.API).pipe(first());
  }

  save(record: ICourse) {
    return this.httpClient.post<ICourse>(this.API, record).pipe(first());
  }
}
