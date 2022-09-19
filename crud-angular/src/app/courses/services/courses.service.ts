import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ICourse } from '../model/course';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private httpClient: HttpClient) {}

  private readonly API = '/assets/courses.json';

  list() {
    return this.httpClient.get<ICourse[]>(this.API).pipe(first());
  }
}
