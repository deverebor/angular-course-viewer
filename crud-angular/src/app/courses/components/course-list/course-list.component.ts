import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICourse } from '../../model/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  @Input() courses: ICourse[] = [];
  @Output() goToAddCourse = new EventEmitter<boolean>(false);
  @Output() goToEditCourse = new EventEmitter<ICourse>(false);
  @Output() deleteCourse = new EventEmitter<ICourse>(false);
  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor() {}

  ngOnInit(): void {}

  emitGoToAddCourse() {
    this.goToAddCourse.emit(true);
  }

  emitGoToEditCourse(course: ICourse) {
    this.goToEditCourse.emit(course);
  }

  emitGoToDeleteCourse(course: ICourse) {
    this.deleteCourse.emit(course);
  }
}
