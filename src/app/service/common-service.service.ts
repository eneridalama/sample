import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  data: Subject<any> = new Subject<any>();

  constructor() { }
}