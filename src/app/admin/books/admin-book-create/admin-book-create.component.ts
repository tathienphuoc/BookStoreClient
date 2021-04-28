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
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-admin-book-create',
  templateUrl: './admin-book-create.component.html',
  styleUrls: ['./admin-book-create.component.css']
})
export class AdminBookCreateComponent implements OnInit {
  fileToUpload: File = null;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  formCreateBook: FormGroup;
  book: Book;
  categories: Category[];
  authors: Author[];
  publishers: Publisher[];
  bookCreate : BookCreate;
  category: string;
  user: User;
  validationErrors: string[] = [];
  constructor(private bookService: BookService, private accountService: AccountService, 
    private categoryService: CategoryService, private authorService:AuthorService,
    private publisherService: PublisherService, private fb: FormBuilder) { 
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
      this.bookCreate = new BookCreate();
    }

  ngOnInit(): void {
    this.initializeFrom();
    this.loadAuthors();
    this.loadCategories();
    this.loadPublishers();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
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
      publisherId: new FormControl(null)
    });
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
    const formData = new FormData();
    formData.append('title', this.formCreateBook.get('title').value);
    formData.append('isbn', this.formCreateBook.get('isbn').value);
    formData.append('price', this.formCreateBook.get('price').value);
    formData.append('discount', this.formCreateBook.get('discount').value);
    formData.append('summary', this.formCreateBook.get('summary').value);
    formData.append('quantityInStock', this.formCreateBook.get('quantityInStock').value);
    formData.append('publicationDate', this.formCreateBook.get('publicationDate').value);
    for (let cate of this.formCreateBook.get('categoryId').value) {
      formData.append('categoryId', cate);
    }
    for (let author of this.formCreateBook.get('authorId').value) {
      formData.append('authorId', author);
    }
    for (let order of this.formCreateBook.get('order_ReceiptId').value) {
      formData.append('authorId', order);
    }
    formData.append('publisherId', this.formCreateBook.get('publisherId').value);
    formData.append('image', this.fileToUpload);
      this.bookService.addBook(formData).subscribe(response => {
      console.log(response);
    }, error => {
      this.validationErrors = error;
    })
  }
}
