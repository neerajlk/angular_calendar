import { Component, OnInit } from '@angular/core';

import holidays from '../data/holidays.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})




export class AppComponent implements OnInit {

  constructor() {}
  monthNumber: number[] = []
  selectedDate: any = ""
  startDateOfTheyear: any = ""
  dateDifference: number = 0
  oneDayTime: number = 0
  dayOfTheYear: number = 0
  selectedMonth: number = 0
  dayInfo: { day: number, isHoliday: boolean, yearDay: number, weekday: string }[] = [];
  weekday: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  months : string[]=["January","February","March","April","May","June","July","August","September","October","November","December"]


  getDayOfTheyear(month, day) {
    this.selectedDate = new Date(2019, month, day);
    this.startDateOfTheyear = new Date(this.selectedDate.getFullYear(), 0, 0);
    this.dateDifference = (this.selectedDate - this.startDateOfTheyear) + ((this.startDateOfTheyear.getTimezoneOffset() - this.selectedDate.getTimezoneOffset()) * 60 * 1000);
    this.oneDayTime = 1000 * 60 * 60 * 24;
    this.dayOfTheYear = Math.floor(this.dateDifference / this.oneDayTime);

    return this.dayOfTheYear
  }

  getDaysInMonth = function (month: number, year: number) {
    return new Date(year, month, 0).getDate();
  };

  getDaysByMonth() {
    let month = this.selectedMonth + 1
    this.dayInfo = []

    for (let i = 0; i < this.getDaysInMonth(month, 2019); i++) {
      let temp = { day: 0, isHoliday: false, yearDay: 0, weekday: "" }
      temp.day = i + 1
      temp.weekday = this.weekday[(new Date(2019, month - 1, i + 1)).getDay()];
      temp.yearDay = this.getDayOfTheyear(month - 1, temp.day)
      let index = holidays.findIndex(x => x.day === temp.yearDay);
      if (index > -1) {
        temp.isHoliday = true
      }
      this.dayInfo.push(temp)
    }
  }

  getInfoOfTheDay(yearDay) {
    let index = holidays.findIndex(x => x.day === yearDay);
    if (index > -1) {
      alert("Date: " + holidays[index].date + "  Day: " + holidays[index].weekday + "  Holiday: " + holidays[index].holiday)
    }
  }

  ngOnInit() {

    for (let i = 0; i < 12; i++) {
      this.monthNumber.push(i)
    }

    this.getDaysByMonth()

    console.log(holidays)
  }


}

