import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {

  constructor() { }
  ngAfterViewInit(): void {
    let categories = document.getElementsByClassName('btn');
    console.log(categories);
    for (let i = 0; i < categories.length; i++) {
      categories[i].addEventListener('click', function () {
        let preActive = document.querySelector("[class*='btn btn-lg active']")
        preActive.classList.remove("active");
        categories[i].classList.add("active");
      })
    }
  }

  ngOnInit(): void {
  }

}
