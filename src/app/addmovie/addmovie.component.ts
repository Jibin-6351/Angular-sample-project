import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpHeaders,
  HttpClientModule,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addmovie',
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule],
  templateUrl: './addmovie.component.html',
  styleUrl: './addmovie.component.css',
})
export class AddmovieComponent {
  constructor(private http: HttpClient, private router: Router) {}

  rating = 1;
  responseData!: any;
  isVisible: boolean = false;
  imgRemove: boolean = false;
  hideImage: boolean = true;

  iconClick() {
    this.hideImage = false;
    const image = document.getElementById('imagePreview') as HTMLImageElement;
    image.src = '';
    const fileInput = document.getElementsByName('file')[0] as HTMLInputElement;
    fileInput.value = '';
  }

  image(event: Event) {
    const fileInput = document.getElementsByName('file')[0] as HTMLInputElement;
    const imagePreview = document.getElementById(
      'imagePreview'
    ) as HTMLImageElement;
    const file = fileInput.files ? fileInput.files[0] : null;

    if (file) {
      this.imgRemove = true;

      const objectURL = URL.createObjectURL(file);

      imagePreview.src = objectURL;
    }
  }

  changeStar(event: Event) {
    this.rating = parseInt((event.target as HTMLSelectElement).value);
  }

  onUpload() {
    const fileInput = document.getElementsByName('file')[0] as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files[0]) {
      const formData = new FormData();
      formData.append('file', fileInput.files[0]);

      this.http
        .post('http://localhost:8080/uploadfile', formData, {
          headers: new HttpHeaders(),
        })
        .subscribe(
          (res) => {
            this.responseData = res;
            this.isVisible = true;
          },
          (err) => console.error(err)
        );
    } else {
      alert('File not selected ');
    }
  }

  data = new FormGroup({
    title: new FormControl(''),
    rating: new FormControl(''),
    description: new FormControl(''),
    director: new FormControl(''),
    releaseDate: new FormControl(''),
    genre: new FormControl(''),
  });

  onClick() {
    const formData = {
      title: this.data.value.title,
      description: this.data.value.description,
      rating: this.rating,
      director: this.data.value.director,
      releaseDate: this.data.value.releaseDate,
      genre: this.data.value.genre,
      file: { id: this.responseData?.id },
    };

    if (
      formData.description &&
      formData.director &&
      formData.file &&
      !(formData.genre === '') &&
      formData.rating &&
      formData.releaseDate &&
      formData.title
    ) {
      this.onPost(formData);
    } else {
      alert('Fill all details');
    }
  }

  onPost(formData: any) {
    this.http
      .post('http://localhost:8080/movie', formData, {
        headers: new HttpHeaders(),
      })
      .subscribe(
        (res) => console.log(res),
        (err) => console.error(err)
      );
  }
}
