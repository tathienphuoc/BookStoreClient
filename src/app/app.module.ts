import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from "ngx-toastr";
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DataTablesModule } from "angular-datatables";
import { DatepickerModule } from 'ng2-datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';



import { TabsModule } from "ngx-bootstrap/tabs";
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { NavComponent } from './nav/nav.component';
import { BookCardComponent } from './books/book-card/book-card.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { BookEditorComponent } from './books/book-editor/book-editor.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { HeaderComponent } from "./header/header.component";
import { FilterComponent } from "./filter/filter.component";
import { SlideShowComponent } from './slide-show/slide-show.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { RegisterComponent } from './register/register.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminBookListComponent } from './admin/books/admin-book-list/admin-book-list.component';
import { AdminBookEditComponent } from './admin/books/admin-book-edit/admin-book-edit.component';
import { AdminBookCardComponent } from './admin/books/admin-book-card/admin-book-card.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { AdminBookCreateComponent } from './admin/books/admin-book-create/admin-book-create.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { HasRoleDirective } from './_directive/has-role.directive';
import { RankComponent } from './rank/rank.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AdminOrderListComponent } from './admin/admin-order-list/admin-order-list.component';
import { IgnoreDirtyDirective } from './_directive/ignore-dirty.directive';
import { AdsComponent } from './ads/ads.component';
import { FooterComponent } from './footer/footer.component';
import { TestComponent } from './test/test.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { UserOrdersListComponent } from './user/user-orders-list/user-orders-list.component';
import { UserInfoComponent } from './user/user-info/user-info.component';
import { BookOrderComponent } from './user/book-order/book-order.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BookCardComponent,
    BookDetailComponent,
    BookEditComponent,
    BookEditorComponent,
    BookListComponent,
    SlideShowComponent,
    RegisterComponent,
    TextInputComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FilterComponent,
    AdminBookListComponent,
    AdminBookEditComponent,
    AdminBookCardComponent,
    AdminBookCreateComponent,
    ShoppingcartComponent,
    HasRoleDirective,
    RankComponent,
    CheckoutComponent,
    AdminOrderListComponent,
    IgnoreDirtyDirective,
    AdsComponent,
    FooterComponent,
    TestComponent,
    DateInputComponent,
    UserOrdersListComponent,
    UserInfoComponent,
    BookOrderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
    TabsModule.forRoot(),
    NgxGalleryModule,
    NgxSpinnerModule,
    FileUploadModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    NgSelectModule,
    MatCardModule,
    MatButtonModule,
    NgMultiSelectDropDownModule.forRoot(),
    PaginationModule,
    DataTablesModule,
    DatepickerModule,
    ModalModule.forRoot(),
    SocialLoginModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('292888465652858')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }