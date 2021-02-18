import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

import { Config } from '../config';
import { Grocery } from './grocery';

@Injectable()
export class GroceryListService {
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
                map((res: any) => {
                    const obj = res.data;
                    return new Grocery(obj.id, obj.name);
                }),
                catchError(this.handleErrors)
            );
    }

    public delete(item: Grocery) {
        const path = this.baseUrl + "/" + item.id;

        return this.http.delete(path, { headers: this.getCommonHeaders() })
            .pipe(
                map(data => data),
                catchError(this.handleErrors)
            );
    }

    private getCommonHeaders() {
        return new HttpHeaders({
            "Content-Type": "application/json",
        });
    }

    private handleErrors(error: HttpErrorResponse) {
        console.log(error);
        return throwError(error);
    }

}
