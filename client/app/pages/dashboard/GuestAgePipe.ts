import { Pipe,PipeTransform } from '@angular/core';

@Pipe({ name: 'guestAge'})

export class GuestAgePipe implements PipeTransform {
    transform(Age: number, Total:number): string {
        return (Age / 30) * 100+"%";
      }
}