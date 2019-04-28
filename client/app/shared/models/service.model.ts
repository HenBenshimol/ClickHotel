import { Time } from '@angular/common';

export class Service {
  _id?: string;
  name?: String;
  hotelName?: String;
  type?: String;
  openHour?: Time;
  closeHour?: Time;
  needDetails?: Boolean;
  details?: String;
}
