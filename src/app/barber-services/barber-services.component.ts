import { Component, Input, OnInit } from '@angular/core';
import {
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { Message } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { barberService } from '../shared/barberService.model';

@Component({
  selector: 'app-barber-services',
  templateUrl: './barber-services.component.html',
  styleUrls: ['./barber-services.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class BarberServicesComponent implements OnInit {
  @Input() services: barberService[] = [];

  display: boolean = false;
  openModal: boolean = false;
  selectedService: barberService = { image: '', title: '', time: 0, price: 0 };
  image: string = '';
  openEdit: boolean = false;
  msgs: Message[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  addService(event: any) {
    if (this.openEdit) {
      const index = this.services.indexOf(this.selectedService);
      this.services.map((item, indx) => {
        console.log(index);
        if (index === indx) {
          this.services[index] = event;
        }
      });
      this.openEdit = false;
      console.log('if' + this.selectedService);
    } else {
      event['image'] = 'assets/images/new-haircut.webp';
      this.services.unshift(event);
      console.log('else' + this.selectedService);
    }
  }

  deleteService(listItem: barberService) {
    console.log(listItem);
    const index = this.services.indexOf(listItem);
    this.services.splice(index, 1);
  }

  showTopRight(severity: string, summary: string, detail: string) {
    this.messageService.add({
      key: 'tl',
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

  confirm(listItem: barberService) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteService(listItem);
        this.showTopRight('success', 'Approved', 'Service deleted');
      },
      reject: () => {
        this.showTopRight('error', 'Recejted', 'Service did not get deleted');
      },
    });
  }

  editService(event: any) {
    this.selectedService = event;
    this.openModal = true;
    this.openEdit = true;
  }

  showDialog() {
    this.display = true;
  }

  showModal(value: boolean) {
    this.openModal = value;
    this.selectedService = { image: '', title: '', time: 0, price: 0 };
  }

  onPress() {
    this.display = !this.display;
  }
}
