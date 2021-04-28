import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBookCreateComponent } from './admin/books/admin-book-create/admin-book-create.component';
import { AdminBookEditComponent } from './admin/books/admin-book-edit/admin-book-edit.component';
import { AdminBookListComponent } from './admin/books/admin-book-list/admin-book-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminGuard } from './_guards/admin.guard';
import { AuthGuard } from './_guards/auth.guard';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { RankComponent } from './rank/rank.component';
import { CheckoutComponent } from './checkout/checkout.component';
const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    children: [
      {path: 'register', component: RegisterComponent},
      {path: 'login', component: LoginComponent},
      {path: 'books', component: BookListComponent},
      {path: 'books/:bookId', component: BookDetailComponent},
      {path: 'admin/books/edit/:bookId', component: AdminBookEditComponent, canActivate: [AdminGuard]}, 
      {path: 'admin/books', component: AdminBookListComponent, canActivate: [AdminGuard]},
      {path: 'admin/books/create', component: AdminBookCreateComponent, canActivate: [AdminGuard]},
      {path: 'shoppingcart', component: ShoppingcartComponent },
      {path: 'rank', component: RankComponent },
      { path: 'admin/books/create', component: AdminBookCreateComponent },
      { path: 'shoppingcart', component: ShoppingcartComponent },
      {path:'checkout',component:CheckoutComponent}

      // {path: 'members/:username', component: MemberDetailComponent},
      // {path: 'member/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard]},
      // {path: 'lists', component: ListsComponent},
    ]
  },
  {path: '**', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
