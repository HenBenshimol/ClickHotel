import { Pipe,PipeTransform } from '@angular/core';

@Pipe({ name: 'guestAge'})

export class GuestAgePipe implements PipeTransform {
    transform(Age: number, Total: number): string {
        console.log(Age);
        console.log(Total);
        
        return (Age / Total) * 100+"%";
      }
}