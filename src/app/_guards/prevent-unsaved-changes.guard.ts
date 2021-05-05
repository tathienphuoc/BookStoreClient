import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminBookEditComponent } from '../admin/books/admin-book-edit/admin-book-edit.component';


@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {


  canDeactivate(component: AdminBookEditComponent): Observable<boolean> | boolean {
    if (component.editForm.dirty) {
      return confirm('Bạn có muốn rồi khỏi trang, mọi thứ chưa lưu sẽ mất.');
    }
    return true;
  }

}
