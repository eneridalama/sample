import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { TimelineComponent } from './timeline/timeline.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox'
import timeGridPlugin from '@fullcalendar/timegrid';
import { BarberServicesComponent } from './barber-services/barber-services.component';
import { AddServiceComponent } from './barber-services/add-service/add-service.component';
import { MessagesModule } from 'primeng/messages';
import { CardModule } from 'primeng/card';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { FileUploadModule } from "primeng/fileupload";
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InputNumberModule} from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from "@angular/common/http";
import { PriceChangerPipe } from './shared/price-changer.pipe';
import {ToastModule} from 'primeng/toast';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ProgressBarModule} from 'primeng/progressbar';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { HeaderComponent } from './header/header.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import { TimeChangerPipe } from './shared/time-changer.pipe';
import {InplaceModule} from 'primeng/inplace';
import {DividerModule} from 'primeng/divider';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
]);

@NgModule({
  declarations: [
    AppComponent,
    BookAppointmentComponent,
    TimelineComponent,
    BarberServicesComponent,
    AddServiceComponent,
    PriceChangerPipe,
    ProgressBarComponent,
    HeaderComponent,
    TimeChangerPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    FormsModule, 
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    CheckboxModule,
    MessagesModule,
    CardModule,
    ConfirmDialogModule,
    FileUploadModule,
    CalendarModule,
    BrowserAnimationsModule,
    InputNumberModule,
    InputMaskModule,
    InputTextModule,
    HttpClientModule,
    ToastModule,
    ConfirmPopupModule,
    ProgressBarModule,
    InputSwitchModule,
    InplaceModule,
    DividerModule
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }