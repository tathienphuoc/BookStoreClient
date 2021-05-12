import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Item } from 'src/app/models/item';
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
  modalRef: BsModalRef;
  config: any;
  itemsOfSpecOrder: Item[];
  order: OrderRecipts;
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private orderService: OrderService, private http: HttpClient,
              private modalService: BsModalService) { }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
  ngOnInit(): void {
    this.config = {
      class: 'modal-lg modal-dialog-centered',
      animated: true
    };
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

  openModal(template: TemplateRef<any>,  order: OrderRecipts) {
    this.modalRef = this.modalService.show(template, this.config);
    this.itemsOfSpecOrder = order.orderItems;
    this.order = order;
  }
}
