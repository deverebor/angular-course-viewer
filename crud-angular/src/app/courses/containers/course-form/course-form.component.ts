import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { ICourse } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  form = this.formBuilder.group({
    _id: [''],
    name: [''],
    category: [''],
  });

  constructor(
    private _location: Location,
    private _snackBar: MatSnackBar,
    private courseService: CoursesService,
    private formBuilder: NonNullableFormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const course: ICourse = this.route.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category,
    });
  }

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

  setSubtitles(): string {
    return this.route.snapshot.url[0].path === 'new'
      ? 'Cadastre com as informações necessárias.'
      : 'Edite os campos com as novas informações.';
  }

  setTitles(): string {
    return this.route.snapshot.url[0].path === 'new'
      ? 'Cadastre um novo curso!'
      : 'Edição do curso.';
  }
}
