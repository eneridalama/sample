import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { barberService } from '../shared/barberService.model';
import { CommonService } from '../service/common-service.service';
import moment from 'moment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss'],
  providers: [MessageService],
})
export class BookAppointmentComponent implements OnInit {
  @Input() services: barberService[] = [];
  @Input() firstname: string = '';
  @Input() lastname: string = '';
  @Input() number: number = 0;
  @Input() date: Date = new Date();
  @Input() hour: Date = new Date();
  Date: Date = new Date();
  minHour: Date = new Date();
  maxHour: Date = new Date();
  addNewAppointmentForm: FormGroup = new FormGroup({});
  display: boolean = false;
  checkedValues: Array<Number> = [];
  set object(item: any) {
    setTimeout(() => {
      if (item !== undefined) {
        this.addNewAppointmentForm = this.initializeForm(item);
      }
    });
  }

  constructor(
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.addNewAppointmentForm = this.initializeForm(null);
    this.timeRange();
  }

  initializeForm(value: any): FormGroup {
    return this.formBuilder.group({
      firstname: new FormControl(value?.firstname, Validators.required),
      lastname: new FormControl(value?.lastname, Validators.required),
      number: new FormControl(value?.number, Validators.required),
      date: new FormControl(value?.date, Validators.required),
      hour: new FormControl(value?.hour, Validators.required),
      servicesList: new FormControl(value?.servicesList, Validators.required),
    });
  }

  timeRange() {
    const today = moment(this.Date).format('YYYY-MM-DD');
    this.minHour = new Date(today + ' 09:00:00');
    this.maxHour = new Date(today + ' 20:59:00');
  }

  checkValue(event: any, service: barberService) {
    if (event.checked.length == 1) {
      this.checkedValues.push(service.time);
    } else {
      const index = this.checkedValues.indexOf(service.time);
      this.checkedValues.splice(index, 1);
    }
  }

  calculateTime() {
    return this.checkedValues.reduce(
      (accumulator: any, curr: any) => accumulator + curr
    );
  }

  addNewAppointment(event: any) {
    event.preventDefault();
    const units: moment.unitOfTime.DurationConstructor = 'minutes';
    let object = {
      firstname: this.addNewAppointmentForm.value.firstname,
      lastname: this.addNewAppointmentForm.value.lastname,
      number: this.addNewAppointmentForm.value.number,
      date: moment(this.addNewAppointmentForm.value.date).format('YYYY-MM-DD'),
      hour: moment(this.addNewAppointmentForm.value.hour).format('HH:mm:ss'),
      duration: moment(
        moment(this.addNewAppointmentForm.value.hour).add(
          this.calculateTime() as moment.DurationInputArg1,
          units
        )
      ).format('HH:mm:ss'),
    };
    this.commonService.data.next(object);
    this.addNewAppointmentForm.reset();
    this.showDialog(false);
    this.showSuccess();
  }

  showSuccess() {
    this.messageService.add({
      key: 'tl',
      severity: 'success',
      summary: 'Success',
      detail: 'Event added',
    });
  }

  showDialog(value: boolean) {
    this.display = value;
    this.addNewAppointmentForm.reset();
  }
}
