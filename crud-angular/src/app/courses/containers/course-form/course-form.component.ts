import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';

import {CoursesService} from '../../services/courses.service';
import {ICourse} from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {

  private formNameMinLength = 5;
  private formNameMaxLength = 100;
  form = this.formBuilder.group({
    _id: [''],
    name: ['', [Validators.required, Validators.minLength(this.formNameMinLength), Validators.maxLength(this.formNameMaxLength)]],
    category: ['', [Validators.required]],
  });

  constructor(
    private _location: Location,
    private _snackBar: MatSnackBar,
    private courseService: CoursesService,
    private formBuilder: NonNullableFormBuilder,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
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

  getErrorMessage(field: string) {
    const fieldControl = this.form.get(field);

    if (fieldControl?.hasError('required')) {
      return 'Campo obrigatório.';
    }

    if (fieldControl?.hasError('minlength')) {
      const requiredLength = fieldControl.errors ? fieldControl.errors['minlength']['requiredLength'] : this.formNameMinLength;

      return `Mínimo de ${requiredLength} caracteres.`;
    }

    if (fieldControl?.hasError('maxlength')) {
      const requiredLength = fieldControl.errors ? fieldControl.errors['maxlength']['requiredLength'] : this.formNameMaxLength;

      return `Máximo de ${requiredLength} caracteres.`;
    }

    return 'Campo inválido.'
  }

  setSubtitle(): string {
    return this.route.snapshot.url[0].path === 'new'
      ? 'Cadastre com as informações necessárias.'
      : 'Edite os campos com as novas informações.';
  }

  setTitle(): string {
    return this.route.snapshot.url[0].path === 'new'
      ? 'Cadastre um novo curso!'
      : 'Edição do curso.';
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
