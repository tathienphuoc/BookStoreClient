import { Component, OnInit, ViewChild } from "@angular/core";
import { TabDirective, TabsetComponent } from "ngx-bootstrap/tabs";
import { take } from "rxjs/operators";
import { Item } from "src/app/models/item";
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
  items: Item[];
  constructor(
    private orderService: OrderService,
    private accountService: AccountService
  ) {
    accountService.currentUser$.pipe(take(1)).subscribe(user=>{
      this.user = user;
    })
  }

  ngOnInit(): void {
    this.loadOrdersByUser();
  }
  loadOrdersByUser() {
    let temp: Item[] = [];
    this.orderService.getOrdersByUser(this.user.id).subscribe(response => {
      this.orders = response;
      console.log(this.orders);
      response.forEach(order => {
        order.orderItems.forEach(item => {
          console.log(item);
          temp.push(item);
          console.log(temp);
        });
      });
      this.items = temp;
    },error => {
      console.log(error);
    });
  }
}
