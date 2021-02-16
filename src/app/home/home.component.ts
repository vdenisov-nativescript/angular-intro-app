import { Component } from '@angular/core';

@Component({
  selector: "ns-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
    message: string = 'All is okay!!!';

    constructor() {
        console.log('Hello World');
        console.dir({ type: 'Apple', color: 'Red' });
    }
}
