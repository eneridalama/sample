import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss'],
})
export class AddServiceComponent implements OnInit {
  serviceForm: FormGroup = new FormGroup({});
  @Output() addedService = new EventEmitter<any>();
  @Output() openModal = new EventEmitter<boolean>();
  @Input()
  set object(item: any) {
    setTimeout(() => {
      if (item !== undefined) {
        this.serviceForm = this.initializeForm(item);
      }
    });
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.serviceForm = this.initializeForm(null);
  }

  initializeForm(value: any): FormGroup {
    return this.formBuilder.group({
      title: new FormControl(value?.title, Validators.required),
      time: new FormControl(value?.time, Validators.required),
      price: new FormControl(value?.price, Validators.required),
      image: new FormControl(value?.image),
    });
  }

  addNewService() {
    this.addedService.emit({
      title: this.serviceForm.value.title,
      price: this.serviceForm.value.price,
      time: this.serviceForm.value.time,
      image: this.serviceForm.value.image,
    });
    this.openModal.emit(false);
  }

  close() {
    this.openModal.emit(false);
  }
}
