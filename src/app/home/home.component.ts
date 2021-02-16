import { Component, OnInit } from '@angular/core';

@Component({
  selector: "ns-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
    message: string = 'All is okay!!!';

    ngOnInit() {
        console.log('init');
    }
}
