import { Component, Input, OnInit } from '@angular/core';
import { Author } from 'src/app/models/author';
import { Book } from 'src/app/models/book';
import { BookCreate } from 'src/app/models/bookCreate';
import { Category } from 'src/app/models/category';
import { Publisher } from 'src/app/models/publisher';
import { AccountService } from 'src/app/_services/account.service';
import { AuthorService } from 'src/app/_services/author.service';
import { BookService } from 'src/app/_services/book.service';
import { CategoryService } from 'src/app/_services/category.service';
import { PublisherService } from 'src/app/_services/publisher.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-book-create',
  templateUrl: './admin-book-create.component.html',
  styleUrls: ['./admin-book-create.component.css']
})
export class AdminBookCreateComponent implements OnInit {
fieldName: string;
formCreateBook: FormGroup;
book: Book;
categories: Category[];
authors: Author[];
publishers: Publisher[];
bookCreate : BookCreate;
category: string;
validationErrors: string[] = [];
  constructor(private bookService: BookService, private accountService: AccountService, 
    private categoryService: CategoryService, private authorService:AuthorService,
    private publisherService: PublisherService, private fb: FormBuilder) { 
      this.bookCreate = new BookCreate();
    }

  ngOnInit(): void {
    console.log(this.fieldName);
    this.initializeFrom();
    this.loadAuthors();
    this.loadCategories();
    this.loadPublishers();
  }

  initializeFrom() {
    this.formCreateBook = this.fb.group({
      title: ['',Validators.required],
      isbn: ['',[Validators.required, Validators.maxLength(6), Validators.pattern("^[0-9]")]],
      price: ['',Validators.required],
      discount: ['',Validators.required],
      summary: ['',Validators.required],
      quantityInStock: ['',Validators.required],
      publicationDate: ['',Validators.required],
      categoryId: new FormArray([]),
      authorId: new FormArray([]),
      order_ReceiptId: new FormArray([]),
      publisherId: [''],
      image:['']
    })
  }

  changePublisher(e) {
    this.formCreateBook.get('publisherId').setValue(e.target.value, {
      onlySelf: true
    })
  }

  onCheckChange(event) {
    const formArray: FormArray = this.formCreateBook.get('categoryId') as FormArray;
    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;
  
      formArray.controls.forEach((ctrl: FormControl) => {
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
  
        i++;
      });
    }
  }

  onCheckAuthorChange(event) {
    const formArray: FormArray = this.formCreateBook.get('authorId') as FormArray;
    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;
  
      formArray.controls.forEach((ctrl: FormControl) => {
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
  
        i++;
      });
    }
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response;
    })
  }
  loadAuthors() {
    this.authorService.getAuthors().subscribe(response => {
      this.authors = response;
    })
  }
  loadPublishers() {
    this.publisherService.getPublishers().subscribe(response => {
      this.publishers = response;
    })
  }
  submitForm() {
    console.log(this.formCreateBook.value);
    // console.log(this.category);
    this.bookService.addBook(this.formCreateBook.value).subscribe(response => {
      console.log(response);
    }, error => {
      this.validationErrors = error;
      console.log(error);
    })
  }
}
