import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { Author } from 'src/app/models/author';
import { Book } from 'src/app/models/book';
import { Category } from 'src/app/models/category';
import { Publisher } from 'src/app/models/publisher';
import { AuthorService } from 'src/app/_services/author.service';
import { BookService } from 'src/app/_services/book.service';
import { CategoryService } from 'src/app/_services/category.service';
import { PublisherService } from 'src/app/_services/publisher.service';

@Component({
  selector: 'app-admin-book-edit',
  templateUrl: './admin-book-edit.component.html',
  styleUrls: ['./admin-book-edit.component.css']
})
export class AdminBookEditComponent implements OnInit, AfterViewInit {
listCategories = [];
listAuthors = [];
selectedCategories:object[]  = [] ;
selectedAuthors = [];
dropdownSettings:IDropdownSettings ={};
dropdownAuthorSettings: IDropdownSettings = {};
@ViewChild ('editForm') editForm: NgForm;
fileToUpload: File = null;
imageSrc: string;
book: Book;
authors: Author[];
categories: Category[];
publishers: Publisher[];
formCreateBook: FormGroup;
@HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
  if (this.editForm.dirty) {
    $event.returnValue = true;
  }
}
  constructor(private bookService: BookService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private categoryService: CategoryService, 
              private authorService:AuthorService,
              private publisherService: PublisherService) {}
  async ngAfterViewInit() {
    
    }

  async ngOnInit() {   
    await this.loadBook();
    console.log('a', this.selectedCategories);

    // this.selectedCategories=[{
    //   id:2,
    //   name:"hello"
    // }];
    console.log('b', this.selectedCategories);
    this.loadCategories();
    this.loadAuthors();
    setTimeout(() => {
      
    }, 5000);
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All', 
      itemsShowLimit:3,
      allowSearchFilter: true
    };
    this.dropdownAuthorSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'fullName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All', 
      itemsShowLimit:3,
      allowSearchFilter: true
    };
  } 
  onItemDeSelectCategory (item: any) {
    let index = this.selectedCategories.indexOf(item.id);
    this.selectedCategories.splice(index, 1);
  }
  onItemSelectCategory(item: any) {    
    this.selectedCategories.push(item);
    console.log(this.selectedCategories);
    
  }
  onSelectAllCategory(items: any) {
    items.forEach(element => {
      this.selectedCategories.push(element.id);
    });
  }
  onDeSelectAllCategory() {
    this.selectedCategories = [];
  }

  onItemDeSelectAuthor (item: any) {
    let index = this.selectedAuthors.indexOf(item.id);
    this.selectedAuthors.splice(index, 1);
    console.log(this.selectedAuthors);
  }
  onItemSelectAuthor(item: any) {
    this.selectedAuthors.push(item.id);
    console.log(this.selectedAuthors);
  }
  onSelectAllAuthor(items: any) {
    items.forEach(element => {
      this.selectedAuthors.push(element.id);
    });
    console.log(this.selectedAuthors);
  }
  onDeSelectAllAuthor() {
    this.selectedAuthors = [];
    console.log(this.selectedAuthors);
    
  }
  
  async loadBook() {
    console.log("Truoc khi load");
    
    const result = await this.bookService.getBook(this.route.snapshot.paramMap.get('bookId')).toPromise()
    
    result.bookCategories.forEach(e=>{
      let a = {
        id: e.category.id,
        name: e.category.name
      }
      this.selectedCategories.push(a);
    })
    console.log('c', this.selectedCategories);
    return this.selectedCategories;
    // .subscribe(book => {
    //   book.bookCategories.forEach(e=>{
    //     let a = {
    //       id: e.category.id,
    //       name: e.category.name
    //     }
    //     this.selectedCategories.push(a);
    //     console.log("loadbook" + this.selectedCategories);
        
    //   })
    //   this.book = book;
    //   this.imageSrc = book.image;
    //   book.authorBooks.forEach(e=>{
    //     this.selectedAuthors.push(e.author);
    //   })
    // })
  }

  updateBook() {
    console.log(this.book);
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }  
  
  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
          this.imageSrc = reader.result as string;
          this.book.image = file;
        }
        reader.readAsDataURL(file);
    }
}

  loadCategories() {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response;
      this.listCategories = response;
    })
  }
  loadAuthors() {
    this.authorService.getAuthors().subscribe(response => {
      this.authors = response;
      this.listAuthors = response;
    })
  }
  loadPublishers() {
    this.publisherService.getPublishers().subscribe(response => {
      this.publishers = response;
    })
  }

}
