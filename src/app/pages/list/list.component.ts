import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TextField } from '@nativescript/core';

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
    public grocery = '';
    @ViewChild('groceryTextField') groceryTextField: ElementRef;

    constructor(private groceryListService: GroceryListService) { }

    ngOnInit() {
        this.groceryListService.load()
            .subscribe(loadedGroceries => {
                loadedGroceries.forEach((groceryObject) => {
                    this.groceryList.unshift(groceryObject);
                });
            });
    }

    public add() {
        if (this.grocery.trim() === '') {
            alert('Enter a grocery item');
            return;
        }

        // Dismiss the keyboard
        let textField = <TextField>this.groceryTextField.nativeElement;
        textField.dismissSoftInput();

        this.groceryListService.add(this.grocery)
            .subscribe(
                groceryObject => {
                    this.groceryList.unshift(groceryObject);
                    this.grocery = '';
                },
                () => {
                    alert({
                        message: 'And error occurred while adding an item to your list.',
                        okButtonText: 'OK'
                    });
                    this.grocery = '';
                }
            );
    }
}
