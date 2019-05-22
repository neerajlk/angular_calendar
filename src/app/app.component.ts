import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})




export class AppComponent implements OnInit {

  constructor() { }
  days = []
  Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  handleClick(month) {
    alert(month)
  }

  ngOnInit() {

    let i = 0
    var getDaysInMonth = function (month, year) {
      return new Date(year, month, 0).getDate();
    };

    for (i = 0; i < getDaysInMonth(2, 2018); i++) {
      this.days.push(i + 1)
    }



    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    console.log('Day of year: ' + day);



  }


}

