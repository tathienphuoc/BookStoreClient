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
export class AdminBookEditComponent implements OnInit {
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
  // @ViewChild("editForm") editForm: NgForm;
  editForm: FormGroup;
  fileToUpload: File;
  imageSrc: string;
  book: Book;
  authors: Author[];
  categories: Category[];
  publishers: Publisher[];
  bsConfig: Partial<BsDatepickerConfig>;
  discountPrevious: number;
  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private authorService: AuthorService,
    private publisherService: PublisherService,
    private mailService: MailService
  ) {}
  initializeFrom() {
    let dateString = this.book.publicationDate;
    let newDate = new Date(dateString);
    console.log(newDate);

    this.editForm = this.fb.group({
      title: [this.book.title, Validators.required],
      isbn: [
        this.book.isbn,
        [
          Validators.required,
          Validators.maxLength(6),
          Validators.pattern("^[0-9]*$"),
        ],
      ],
      price: [
        this.book.price,
        [Validators.required, Validators.pattern("^[0-9]*$")],
      ],
      discount: [
        this.book.discount*100,
        [Validators.required, Validators.pattern("^[0-9][0-9]?$|^100$")],
      ],
      summary: [this.book.summary, Validators.required],
      quantityInStock: [
        this.book.quantityInStock,
        [Validators.required, Validators.pattern("^[0-9]*$")],
      ],
      publicationDate: [new Date(), Validators.required],
      categoryId: [this.selectedCategories, Validators.required],
      authorId: [this.selectedAuthors, Validators.required],
      // order_ReceiptId: new FormArray([]),
      publisherId: new FormControl(this.book.publisherId),
    });
  }

  isDirty() {
    if (this.editForm.dirty) {
      return true;
    } else {
      return false;
    }
  }
  async ngOnInit() {
    await this.loadBook();
    this.initializeFrom();
    console.log(this.book);
    this.maxDate = new Date();
    this.datePickerValue = new Date(this.book.publicationDate);
    this.loadCategories();
    this.loadAuthors();
    this.loadPublishers();
    // setTimeout(() => {
    //   this.editForm?.form.controls["selectedCategories"].markAsPristine();
    //   this.editForm?.form.controls["selectedAuthors"].markAsPristine();
    // }, 1);
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
    const index = this.selectedCategories
      .map((item) => item.id)
      .indexOf(item.id);
    if (index > -1) {
      this.selectedCategories.splice(index, 1);
    }
    if (this.selectedCategories.length == 0) {
      this.toastr.error("Choose at least one category");
    }
  }
  onItemSelectCategory(item: any) {
    this.selectedCategories.push(item);
    console.log("select", this.selectedCategories);
  }
  onSelectAllCategory(items: any) {
    items.forEach((element) => {
      this.selectedCategories.push(element);
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
    const index = this.selectedAuthors.map((item) => item.id).indexOf(item.id);
    if (index > -1) {
      this.selectedAuthors.splice(index, 1);
    }
    if (this.selectedAuthors.length == 0) {
      this.toastr.error("Choose at least one author");
    }
  }
  onItemSelectAuthor(item: any) {
    this.selectedAuthors.push(item);
    console.log("select", this.selectedAuthors);
  }
  onSelectAllAuthor(items: any) {
    items.forEach((element) => {
      this.selectedAuthors.push(element);
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
  }

  updateBook() {
    const formData = new FormData();
    formData.append("id", this.book.id.toString());
    formData.append("title", this.editForm.get("title").value);
    formData.append("price", this.editForm.get("price").value);
    formData.append("isbn", this.editForm.get("isbn").value);
    const x = Number(this.editForm.get("discount").value);
    let discount = x/100;
    formData.append("discount", discount.toFixed(2).toString());
    const datestr = new Date(
      this.editForm.get("publicationDate").value
    ).toUTCString();
    formData.append("publicationDate", datestr);
    formData.append("publisherId", this.editForm.get("publisherId").value);
    formData.append(
      "quantityInStock",
      this.editForm.get("quantityInStock").value
    );
    formData.append("summary", this.editForm.get("summary").value);
    for (let cate of this.selectedCategories) {
      console.log(cate.id);
      formData.append("categoryId", cate.id);
    }
    for (let author of this.selectedAuthors) {
      formData.append("authorId", author.id);
    }
    if (this.fileToUpload != null) {
      formData.append("image", this.fileToUpload);
    }
    this.bookService.updateBook(formData).subscribe(async (res: Book) => {
      console.log(res);
      if (res) {
        await this.loadBook();
        console.log(this.book.discount);
        this.sendMail(this.book.reviews);
        this.editForm.markAsPristine();
        this.toastr.success("Book successfully updated");
      }
    });
    // console.log(this.book);
  }
  sendMail(reviews: any) {
    reviews.forEach((review) => {
      if (review.account.email != null) {
        const formData = new FormData();
        formData.append("toEmail", review.account.email);
        formData.append(
          "subject",
          "Hooray! Congratulations! , Your love book is sale off, BUY IT NOW !"
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
    let bookName = this.book.title;
    let discountPecent = this.book.discount * 100;
    console.log(discountPecent);
    let content =
      "Hi ! Your love book " +
      bookName +
      " is safe off " +
      discountPecent +
      " % !!! Just only $" +
      (this.book.price - (this.book.discount * this.book.price)) +
      ". " + "<a href='http://localhost:4200/books/"+this.route.snapshot.paramMap.get("bookId")+"'>BUY NOW!</a>";
    body = content;
    console.log(body);
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
