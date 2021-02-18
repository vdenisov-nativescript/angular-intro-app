import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

import { Config } from '../config';
import { Grocery } from './grocery';

@Injectable()
export class GroceryListService {
    // private baseUrl = Config.apiUrl + "appdata/" + Config.appKey + "/Groceries";
    private baseUrl = Config.apiUrl + '/grocery';

    constructor(private http: HttpClient) { }

    public load() {
        return this.http
            .get(this.baseUrl, { headers: this.getCommonHeaders() })
            .pipe(
                map((res: any) => {
                    const groceryList = res.data.map(grocery => {
                        return new Grocery(grocery.id, grocery.name);
                    });
                    return groceryList;
                }),
                catchError(this.handleErrors)
            );
    }

    public add(text: string) {
        const data = JSON.stringify({ name: text });

        return this.http
            .post(this.baseUrl, data, { headers: this.getCommonHeaders() })
            .pipe(
                map((data: any) => new Grocery(data.id, data.name)),
                catchError(this.handleErrors)
            );
    }

    private getCommonHeaders() {
        return new HttpHeaders({
            "Content-Type": "application/json",
            // "Authorization": "Kinvey " + Config.token,
        });
    }

    private handleErrors(error: HttpErrorResponse) {
        console.log(error);
        return throwError(error);
    }

}
