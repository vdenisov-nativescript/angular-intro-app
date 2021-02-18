import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TextField } from '@nativescript/core';

import * as SocialShare from 'nativescript-social-share';

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

    public isLoading = false;
    public listLoaded = false;

    @ViewChild('groceryTextField') groceryTextField: ElementRef;

    constructor(private groceryListService: GroceryListService) { }

    ngOnInit() {
        this.isLoading = true;

        this.groceryListService.load()
            .subscribe(loadedGroceries => {
                loadedGroceries.forEach((groceryObject) => {
                    this.groceryList.unshift(groceryObject);
                });

                this.isLoading = false;
                this.listLoaded = true;
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

    public delete(grocery: Grocery) {
        this.groceryListService.delete(grocery)
            .subscribe(
                () => {
                    this.groceryList = this.groceryList.filter(item => item.id !== grocery.id);
                },
                () => {
                    alert({
                        message: `Grocery "${grocery.name}" wasn't deleted !`,
                        okButtonText: 'OK'
                    });
                },
            )
    }

    public share() {
        const list = [];
        for (let i = 0, size = this.groceryList.length; i < size; i++) {
            list.push(this.groceryList[i].name);
        }
        const listString = list.join(', ').trim();
        SocialShare.shareText(listString);
    }
}
