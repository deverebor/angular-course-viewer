import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { ICourse } from '../../model/course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses$: Observable<ICourse[]>;

  constructor(
    private actualRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.courses$ = this.coursesService.getAll().pipe(
      catchError((error) => {
        this.onError('Encontramos um problema ao tentar carregar os cursos.');
        return of([]);
      })
    );
  }

  ngOnInit(): void {}

  onError(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage,
    });
  }

  goToAddCourse() {
    this.router.navigate(['new'], { relativeTo: this.actualRoute });
  }

  goToEditCourse(course: ICourse) {
    this.router.navigate(['edit', course._id], {
      relativeTo: this.actualRoute,
    });
  }
}
