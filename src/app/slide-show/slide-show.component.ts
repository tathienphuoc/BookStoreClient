import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css'],
})
export class SlideShowComponent implements OnInit {
  images: string[] = [
    "https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/slider-01.jpg",
    "https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/slider-02.jpg",
    "https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/slider-03.jpg"
  ]
  constructor() { }

  ngOnInit(): void {
  }
}
