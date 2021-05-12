import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
  FormsModule,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { moment } from "ngx-bootstrap/chronos/test/chain";
import { setDate } from "ngx-bootstrap/chronos/utils/date-setters";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { ToastrService } from "ngx-toastr";
import { Author } from "src/app/models/author";
import { Book } from "src/app/models/book";
import { Category } from "src/app/models/category";
import { Publisher } from "src/app/models/publisher";
import { AuthorService } from "src/app/_services/author.service";
import { BookService } from "src/app/_services/book.service";
import { CategoryService } from "src/app/_services/category.service";
import { MailService } from "src/app/_services/mail.service";
import { PublisherService } from "src/app/_services/publisher.service";

@Component({
  selector: "app-admin-book-edit",
  templateUrl: "./admin-book-edit.component.html",
  styleUrls: ["./admin-book-edit.component.css"],
})
export class AdminBookEditComponent implements OnInit, AfterViewInit {
  datePickerValue: Date;
  maxDate: Date;
  bsValue = new Date();
  listCategories = [];
  listAuthors = [];
  selectedCategories = [];
  selectedAuthors = [];
  reviews = [];
  dropdownSettings: IDropdownSettings = {};
  dropdownAuthorSettings: IDropdownSettings = {};
  @ViewChild("editForm") editForm: NgForm;
  fileToUpload: File = null;
  imageSrc: string;
  book: Book;
  authors: Author[];
  categories: Category[];
  publishers: Publisher[];
  bsConfig: Partial<BsDatepickerConfig>;
  discountPrevious: number;
  @HostListener("window:beforeunload", ["$event"]) unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private authorService: AuthorService,
    private publisherService: PublisherService,
    private mailService: MailService
  ) {}
  ngAfterViewInit() {}

  ignoreDirty() {}
  async ngOnInit() {
    await this.loadBook();
    console.log(this.book);
    this.maxDate = new Date();
    this.datePickerValue = new Date(this.book.publicationDate);
    this.loadCategories();
    this.loadAuthors();
    this.loadPublishers();
    setTimeout(() => {
      this.editForm?.form.controls["selectedCategories"].markAsPristine();
      this.editForm?.form.controls["selectedAuthors"].markAsPristine();
    }, 1);
    this.bsConfig = {
      containerClass: "theme-red",
      dateInputFormat: "DD MMMM YYYY",
    };
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
  onItemDeSelectCategory(item: any) {
    if (this.selectedCategories.length == 0) {
      this.toastr.error("Choose at least one category");
    }
  }
  onItemSelectCategory(item: any) {
    console.log("select", this.selectedCategories);
  }
  onSelectAllCategory(items: any) {
    items.forEach((element) => {
      this.selectedCategories.push(element.id);
    });
    console.log("selectAll", this.selectedCategories);
  }
  onDeSelectAllCategory(items: any) {
    this.selectedCategories = [];
    if (this.selectedCategories.length == 0) {
      this.toastr.error("Choose at least one category");
    }
    console.log("DeSelectAll", this.selectedCategories);
  }

  onItemDeSelectAuthor(item: any) {
    if (this.selectedAuthors.length == 0) {
      this.toastr.error("Choose at least one author");
    }
  }
  onItemSelectAuthor(item: any) {}
  onSelectAllAuthor(items: any) {
    items.forEach((element) => {
      this.selectedAuthors.push(element.id);
    });
  }
  onDeSelectAllAuthor(items: any) {
    this.selectedAuthors = [];
    if (this.selectedAuthors.length == 0) {
      this.toastr.error("Choose at least one category");
    }
  }

  async loadBook() {
    console.log("Truoc khi load");
    let categories = [];
    let authors = [];
    const result = await this.bookService
      .getBook(this.route.snapshot.paramMap.get("bookId"))
      .toPromise();

    result.bookCategories.forEach((e) => {
      let a = {
        id: e.category.id,
        name: e.category.name,
      };
      categories.push(a);
    });
    this.selectedCategories = categories;

    result.authorBooks.forEach((e) => {
      let a = {
        id: e.author.id,
        fullName: e.author.fullName,
      };
      authors.push(a);
    });
    this.selectedAuthors = authors;
    this.book = result;
    this.reviews = result.reviews;
    this.discountPrevious = result.discount;
    this.imageSrc = result.image;

    // .subscribe(book => {
    //   book.bookCategories.forEach(e=>{
    //     let a = {
    //       id: e.category.id,
    //       name: e.category.name
    //     }
    //     this.selectedCategories.push(a);
    //     console.log("loadbook" + this.selectedCategories);

    //   })
    //   book.authorBooks.forEach(e=>{
    //     this.selectedAuthors.push(e.author);
    //   })
    // })
  }

  updateBook() {
    const formData = new FormData();
    formData.append("id", this.book.id.toString());
    formData.append("title", this.book.title);
    formData.append("price", this.book.price.toString());
    formData.append("isbn", this.book.isbn);
    formData.append("discount", this.book.discount.toString());
    formData.append("publicationDate", this.datePickerValue.toUTCString());
    formData.append("publisherId", this.book.publisherId.toString());
    formData.append("quantityInStock", this.book.quantityInStock.toString());
    formData.append("summary", this.book.summary.toString());
    for (let cate of this.selectedCategories) {
      formData.append("categoryId", cate.id);
    }
    for (let author of this.selectedAuthors) {
      formData.append("authorId", author.id);
    }
    if (this.fileToUpload != null) {
      formData.append("image", this.fileToUpload);
    }
    this.bookService.updateBook(formData).subscribe((res) => {
      console.log(res);
      if (res) {
        this.sendMail(this.reviews);
      }
    });
    console.log(this.book);
  }
  sendMail(reviews: any) {
    reviews.forEach((review) => {
      if (review.account.email != null) {
        const formData = new FormData();
        formData.append("toEmail", review.account.email);
        formData.append(
          "subject",
          "Chúc mừng bạn, cuốn sách bạn yêu thích vừa được giảm giá, mua ngay thôi !"
        );
        formData.append("body", this.getBodyEmail());
        this.mailService.sendMail(formData).subscribe(
          (response) => {},
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  getBodyEmail() {
    let body = "";
    const bookName = this.book.title;
    const discountPecent = this.book.discount * 100;
    const content =
      "Hi ! Your love book " +
      bookName +
      " is safe off " +
      discountPecent +
      " % !!! Just only $" +
      this.book.price * this.book.discount +
      ". BUY NOW !";
    body = content;
    return body;
  }

  getListEmail() {}

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  onSelectedChange(event: any) {
    this.book.publisherId = event as number;
  }
  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.fileToUpload = file;
      };
      reader.readAsDataURL(file);
    }
    console.log(this.imageSrc, this.book.image);
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response;
      this.listCategories = response;
    });
  }
  loadAuthors() {
    this.authorService.getAuthors().subscribe((response) => {
      this.authors = response;
      this.listAuthors = response;
    });
  }
  loadPublishers() {
    this.publisherService.getPublishers().subscribe((response) => {
      this.publishers = response;
    });
  }
}
