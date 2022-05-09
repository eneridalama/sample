import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { LocalStorageService } from '../service/local-storage.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  value: number = 0;
  minutesList: Array<number> = [0];
  maxMinutes: number = 720;
  totalMinutes: number = 0;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.value = this.calculateProgressBar();
  }

  findTotalMinutes(): number {
    const eventList = this.localStorageService.getEventList();
    const today = new Date();
    for (let event in eventList) {
      if (
        moment(this.localStorageService.getEventById(+event + 1)!.start).isSame(
          today,
          'day'
        )
      ) {
        let a = moment(
          this.localStorageService.getEventById(+event + 1)!.start
        );
        let b = moment(this.localStorageService.getEventById(+event + 1)!.end);
        this.minutesList.push(b.diff(a, 'minutes'));
      }
    }
    return this.minutesList.reduce(
      (accumulator: any, curr: any) => accumulator + curr
    );
  }

  calculateProgressBar() {
    this.totalMinutes = this.findTotalMinutes();
    return (
      Math.round(
        ((this.totalMinutes / this.maxMinutes) * 100 + Number.EPSILON) * 100
      ) / 100
    );
  }
}
