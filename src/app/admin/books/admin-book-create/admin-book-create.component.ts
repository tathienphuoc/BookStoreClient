import { Component, Input, OnInit } from "@angular/core";
import { Author } from "src/app/models/author";
import { Book } from "src/app/models/book";
import { BookCreate } from "src/app/models/bookCreate";
import { Category } from "src/app/models/category";
import { Publisher } from "src/app/models/publisher";
import { AccountService } from "src/app/_services/account.service";
import { AuthorService } from "src/app/_services/author.service";
import { BookService } from "src/app/_services/book.service";
import { CategoryService } from "src/app/_services/category.service";
import { PublisherService } from "src/app/_services/publisher.service";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { FileUploader } from "ng2-file-upload";
import { environment } from "src/environments/environment";
import { take } from "rxjs/operators";
import { User } from "src/app/models/user";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-admin-book-create",
  templateUrl: "./admin-book-create.component.html",
  styleUrls: ["./admin-book-create.component.css"],
})
export class AdminBookCreateComponent implements OnInit {
  listCategories = [];
  listAuthors = [];
  selectedCategories = [];
  selectedAuthors = [];
  dropdownSettings: IDropdownSettings = {};
  dropdownAuthorSettings: IDropdownSettings = {};
  fileToUpload: File = null;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  formCreateBook: FormGroup;
  book: Book;
  categories: Category[];
  authors: Author[];
  publishers: Publisher[];
  bookCreate: BookCreate;
  category: string;
  user: User;
  validationErrors: string[] = [];
  constructor(
    private bookService: BookService,
    private accountService: AccountService,
    private categoryService: CategoryService,
    private authorService: AuthorService,
    private publisherService: PublisherService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
    this.bookCreate = new BookCreate();
  }

  ngOnInit(): void {
    this.initializeFrom();
    this.loadAuthors();
    this.loadCategories();
    this.loadPublishers();
    this.dropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "name",
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.dropdownAuthorSettings = {
      singleSelection: false,
      idField: "id",
      textField: "fullName",
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  initializeFrom() {
    this.formCreateBook = this.fb.group({
      title: ["", Validators.required],
      isbn: [
        "",
        [
          Validators.required,
          Validators.maxLength(6),
          Validators.pattern("^[0-9]"),
        ],
      ],
      price: ["", Validators.required],
      discount: ["", Validators.required],
      summary: ["", Validators.required],
      quantityInStock: ["", Validators.required],
      publicationDate: ["", Validators.required],
      categoryId: ["", Validators.required],
      authorId: ["", Validators.required],
      order_ReceiptId: new FormArray([]),
      publisherId: new FormControl(null),
    });
  }
  onItemDeSelectAuthor(item: any) {
    let index = this.selectedAuthors.indexOf(item);
    this.selectedAuthors.splice(index, 1);
    if (this.selectedAuthors.length == 0) {
      this.toastr.error("Choose at least one author");
    }
    console.log(this.selectedAuthors);
  }
  onItemSelectAuthor(item: any) {
    this.selectedAuthors.push(item.id);
    console.log(this.selectedAuthors);
  }
  onSelectAllAuthor(items: any) {
    items.forEach((element) => {
      this.selectedAuthors.push(element.id);
    });
    console.log(this.selectedAuthors);
  }
  onDeSelectAllAuthor(items: any) {
    this.selectedAuthors = [];
    if (this.selectedAuthors.length == 0) {
      this.toastr.error("Choose at least one category");
    }
    console.log(this.selectedAuthors);
  }

  onItemDeSelectCategory(item: any) {
    let index = this.selectedCategories.indexOf(item);
    this.selectedCategories.splice(index, 1);
    if (this.selectedCategories.length == 0) {
      this.toastr.error("Choose at least one author");
    }
    console.log(this.selectedCategories);
  }
  onItemSelectCategory(item: any) {
    this.selectedCategories.push(item.id);
    console.log(this.selectedCategories);
  }
  onSelectAllCategory(items: any) {
    items.forEach((element) => {
      this.selectedCategories.push(element.id);
    });
    console.log(this.selectedCategories);
  }
  onDeSelectAllCategory(items: any) {
    this.selectedCategories = [];
    if (this.selectedCategories.length == 0) {
      this.toastr.error("Choose at least one category");
    }
    console.log(this.selectedCategories);
  }
  changePublisher(e) {
    this.formCreateBook.get("publisherId").setValue(e.target.value, {
      onlySelf: true,
    });
  }

  onCheckChange(event) {
    const formArray: FormArray = this.formCreateBook.get(
      "categoryId"
    ) as FormArray;
    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    } else {
    /* unselected */
      // find the unselected element
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  onCheckAuthorChange(event) {
    const formArray: FormArray = this.formCreateBook.get(
      "authorId"
    ) as FormArray;
    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    } else {
    /* unselected */
      // find the unselected element
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  async loadCategories() {
    const result = await this.categoryService.getCategories().toPromise();
    this.listCategories = result;
  }
  async loadAuthors() {
    const result = await this.authorService.getAuthors().toPromise();
    this.listAuthors = result;
  }
  loadPublishers() {
    this.publisherService.getPublishers().subscribe((response) => {
      this.publishers = response;
    });
  }
  submitForm() {
    const formData = new FormData();
    formData.append("title", this.formCreateBook.get("title").value);
    formData.append("isbn", this.formCreateBook.get("isbn").value);
    formData.append("price", this.formCreateBook.get("price").value);
    formData.append("discount", this.formCreateBook.get("discount").value);
    formData.append("summary", this.formCreateBook.get("summary").value);
    formData.append(
      "quantityInStock",
      this.formCreateBook.get("quantityInStock").value
    );
    formData.append(
      "publicationDate",
      this.formCreateBook.get("publicationDate").value
    );
    for (const index in this.selectedCategories) {
      // instead of passing this.arrayValues.toString() iterate for each item and append it to form.
      formData.append(
        `categoryId[${index}]`,
        this.selectedCategories[index].toString()
      );
    }
    for (const index in this.selectedAuthors) {
      // instead of passing this.arrayValues.toString() iterate for each item and append it to form.
      formData.append(
        `authorId[${index}]`,
        this.selectedAuthors[index].toString()
      );
    }

    for (let order of this.formCreateBook.get("order_ReceiptId").value) {
      formData.append("order_ReceiptId", order);
    }
    formData.append(
      "publisherId",
      this.formCreateBook.get("publisherId").value
    );
    formData.append("image", this.fileToUpload);
    console.log(formData.get("image"));
    console.log(formData.get("categoryId"));
    console.log(formData.get("authorId"));
    console.log(formData.get("order_ReceiptId"));
    console.log(formData.get("publisherId"));

    this.bookService.addBook(formData).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        this.validationErrors = error;
        console.log(error);
      }
    );
  }
}
