import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    // canActivate: [AuthGuard],
    children: [
      {path: 'register', component: RegisterComponent},
      {path: 'login', component: LoginComponent},
      // {path: 'members/:username', component: MemberDetailComponent},
      // {path: 'member/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard]},
      // {path: 'lists', component: ListsComponent},
    ]
  },
  // {path: 'errors', component: TestErrorsComponent},
  // {path: 'not-found', component: NotFoundComponent},
  // {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
