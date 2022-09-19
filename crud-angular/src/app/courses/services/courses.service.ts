import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ICourse } from '../model/course';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private httpClient: HttpClient) {}

  list(): ICourse[] {
    return [
      {
        _id: '1',
        name: 'Angular',
        category: 'Frontend',
      },
    ];
  }
}
