import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { OrderRecipts } from 'src/app/models/orderRecipts';
import { OrderService } from 'src/app/_services/order.service';


@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.css']
})
export class AdminOrderListComponent implements OnDestroy, OnInit {
  orders : OrderRecipts[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private orderService: OrderService, private http: HttpClient) { }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.dtOptions = {
      pageLength: 5,
    };
    this.loadOrders();
  }
  loadOrders(){
    this.orderService.getOrders().subscribe(response => {
      this.orders = response;
      console.log(this.orders);
      this.dtTrigger.next()
    })
  }
}
