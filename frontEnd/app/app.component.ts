import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {LibraryService} from "./services/library.service";
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './forms/form.html',

  providers: [LibraryService]
})
export class AppComponent implements OnInit{
  title = 'finalprojetfe';
  author!: string;
  result_titles?:string;
  constructor(private form:FormBuilder,
              private library:LibraryService) {
  }
  booksFormGroup = this.form.group({
    formAuthor:['', Validators.required]
  })

  getBooks() {
    const author = this.booksFormGroup.value.formAuthor;
    const requestData = { author: author };
    // Subscribe to responses from the LibraryService
    console.log('form data:', author)
    console.log(requestData)
    this.library.getBooks(requestData).subscribe((response) => {
      // Handle the response
      this.result_titles = response;
    });
  }
  ngOnInit() {
    // Subscribe to responses from the LibraryService
    this.library.getBooks(this.booksFormGroup.value.formAuthor).subscribe((response) => {
      // Handle the response
      this.result_titles = response;
    });
  }
}


