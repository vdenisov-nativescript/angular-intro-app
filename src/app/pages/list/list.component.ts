import { Component, OnInit } from '@angular/core';
import { Grocery } from '../../shared/grocery/grocery';
import { GroceryListService } from '../../shared/grocery/grocery-list.service';

@Component({
    selector: 'list',
    providers: [GroceryListService],
    templateUrl: './list.component.html',
    styleUrls: ['./list-common.css', './list.css']
})
export class ListComponent implements OnInit {
    public groceryList: Grocery[] = [];

    constructor(private groceryListService: GroceryListService) { }

    public ngOnInit() {
        this.groceryListService.load()
            .subscribe(loadedGroceries => {
                loadedGroceries.forEach((groceryObject) => {
                    this.groceryList.unshift(groceryObject);
                });
            });
    }
}
