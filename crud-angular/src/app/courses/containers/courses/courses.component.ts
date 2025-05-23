import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, Observable, of} from 'rxjs';
import {
  ErrorDialogComponent
} from 'src/app/shared/components/error-dialog/error-dialog.component';

import {ICourse} from '../../model/course';
import {CoursesService} from '../../services/courses.service';
import {
  ConfirmationDialogComponent
} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";
import {
  IConfirmationDialog
} from "../../../shared/components/confirmation-dialog/interfaces/confirmation-dialog";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  courses$: Observable<ICourse[]> | null = null;

  constructor(
    private _snackBar: MatSnackBar,
    private actualRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.refresh();
  }

  refresh() {
    this.courses$ = this.coursesService.getAll().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar cursos.');
        return of([]);
      })
    );
  }

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

  onDeleteCourse(course: ICourse) {
    const dialogDeleteCourse: IConfirmationDialog = {
      title: `Deseja realmente excluir o curso ${course.name}?`,
      message: 'Esta ação não poderá ser desfeita. Deseja continuar?',
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogDeleteCourse,
    });

    dialogRef.afterClosed().subscribe((dialogResult: boolean) => {
      if (dialogResult) {
        this.coursesService.delete(course._id).subscribe({
          next: () => {
            this.refresh();
            this._snackBar.open('Curso removido com sucesso!', 'X', {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          },
          error: () => {
            this.onError('Encontramos um problema ao tentar excluir o curso.');
          },
        });
      }
    });
  }
}
