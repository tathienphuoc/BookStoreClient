import { Component, OnInit, ViewChild } from "@angular/core";
import { TabDirective, TabsetComponent } from "ngx-bootstrap/tabs";
import { take } from "rxjs/operators";
import { OrderRecipts } from "src/app/models/orderRecipts";
import { User } from "src/app/models/user";
import { AccountService } from "src/app/_services/account.service";
import { OrderService } from "src/app/_services/order.service";

@Component({
  selector: "app-user-orders-list",
  templateUrl: "./user-orders-list.component.html",
  styleUrls: ["./user-orders-list.component.css"],
})
export class UserOrdersListComponent implements OnInit {
  @ViewChild("orderTabs", { static: true }) orderTabs: TabsetComponent;
  orders: OrderRecipts[];
  activeTab: TabDirective;
  user: User;
  constructor(
    private orderService: OrderService,
    private accountService: AccountService
  ) {
    accountService.currentUser$.pipe(take(1)).subscribe(user=>{
      this.user = user;
    })
  }

  ngOnInit(): void {}
  loadOrdersByUser() {
    this.orderService.getOrdersByUser(this.user.id).subscribe(response => {
      this.orders = response;
    });
  }
}
