import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ICourse } from '../model/course';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private httpClient: HttpClient) {}

  private readonly API = 'api/courses/';

  getAll() {
    return this.httpClient.get<ICourse[]>(this.API).pipe(first());
  }

  getById(id: string) {
    return this.httpClient.get<ICourse>(`${this.API}${id}`).pipe(first());
  }

  save(record: Partial<ICourse>) {
    if (record._id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<ICourse>) {
    return this.httpClient.post<ICourse>(this.API, record).pipe(first());
  }

  private update(record: Partial<ICourse>) {
    return this.httpClient
      .put<ICourse>(`${this.API}${record._id}`, record)
      .pipe(first());
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.API}${id}`).pipe(first());
  }
}
