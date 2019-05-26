import { Component, OnInit } from '@angular/core';

import holidays from '../data/holidays.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor() { }

  //Initialising Binding variables
  year: number[] = []
  selectedYear: number = 2019
  months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  monthNumber: number[] = []
  selectedMonth: number = 0
  weekday: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  dayInfo: { day: number, isHoliday: boolean, yearDay: number, weekday: string }[] = [];
  holidayInfo: { date: string, day: string, holiday: string, description: string }[] = []

  //variables for function whih gives day of the year
  selectedDate: any = ""
  startDateOfTheyear: any = ""
  dateDifference: number = 0
  oneDayTime: number = 0
  dayOfTheYear: number = 0

  // to get day of the year (eg: 28 February is 59th Day of the Year)
  getDayOfTheyear(year, month, day) {
    this.selectedDate = new Date(year, month, day);
    this.startDateOfTheyear = new Date(this.selectedDate.getFullYear(), 0, 0);
    this.dateDifference = (this.selectedDate - this.startDateOfTheyear) + ((this.startDateOfTheyear.getTimezoneOffset() - this.selectedDate.getTimezoneOffset()) * 60 * 1000);
    this.oneDayTime = 1000 * 60 * 60 * 24;
    this.dayOfTheYear = Math.floor(this.dateDifference / this.oneDayTime);

    return this.dayOfTheYear
  }

  // to get number of days in a selected Month
  getDaysInMonth = function (month: number, year: number) {
    return new Date(year, month, 0).getDate();
  };

  // to get days in a selected Month and Year
  getDaysByMonthAndYear() {
    this.holidayInfo = []
    let month = this.selectedMonth + 1
    let year = this.selectedYear
    this.dayInfo = []

    for (let i = 0; i < this.getDaysInMonth(month, year); i++) {
      let temp = { day: 0, isHoliday: false, yearDay: 0, weekday: "" }
      temp.day = i + 1
      temp.weekday = this.weekday[(new Date(year, month - 1, i + 1)).getDay()];
      temp.yearDay = this.getDayOfTheyear(year, month - 1, temp.day)
      let index = holidays.findIndex(x => x.day === temp.yearDay);
      if (index > -1 && year == 2019) {
        temp.isHoliday = true
      }
      this.dayInfo.push(temp)
    }
  }

  // get info of the chosen day
  getInfoOfTheDay(year, month, day, yearDay) {
    let index = holidays.findIndex(x => x.day === yearDay);
    this.holidayInfo = []
    let info = { "date": "", "day": "", "holiday": "", "description": "" }
    if (index > -1 && year == 2019) {
      info.date = holidays[index].date
      info.day = holidays[index].weekday
      info.holiday = holidays[index].holiday
      info.description = holidays[index].description
    }
    else {
      info.date = this.months[month] + ' ' + day
      info.day = this.weekday[(new Date(year, month, day)).getDay()]
      info.holiday = "-"
      info.description = "-"
    }

    this.holidayInfo.push(info)
  }

  ngOnInit() {

    // Month List Initialisation
    for (let i = 0; i < 12; i++) {
      this.monthNumber.push(i)
    }

    // year List Initialisation
    for (let i = 2001; i < 2100; i++) {
      this.year.push(i)
    }

    //init of getting days in a particular Month and Year
    this.getDaysByMonthAndYear()
  }


}

