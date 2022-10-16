import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  form = this.formBuilder.group({
    name: [''],
    category: [''],
  });

  constructor(
    private _location: Location,
    private _snackBar: MatSnackBar,
    private courseService: CoursesService,
    private formBuilder: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.courseService.save(this.form.value).subscribe({
      next: () => {
        this.onSuccess();
      },
      error: () => {
        this.onError();
      },
    });
  }

  onCancel() {
    this._location.back();
  }

  private onError() {
    this._snackBar.open('Erro ao salvar o curso.', 'Fechar', {
      duration: 2000,
    });
  }

  private onSuccess() {
    this._snackBar.open('Curso salvo com sucesso.', 'Fechar', {
      duration: 2000,
    });
    this._location.back();
  }
}
