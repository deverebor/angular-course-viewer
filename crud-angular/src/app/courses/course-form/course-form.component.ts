import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CoursesService,
    private _snackBar: MatSnackBar,
    private _location: Location
  ) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null],
    });
  }

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
