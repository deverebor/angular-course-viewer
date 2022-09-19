import { Component, OnInit } from '@angular/core';
import { ICourse } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses: ICourse[] = [];
  displayedColumns = ['name', 'category'];

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.courses = this.coursesService.list();
  }
}
