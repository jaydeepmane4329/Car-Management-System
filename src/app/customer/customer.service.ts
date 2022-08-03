import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { map } from "rxjs";
import { Customer } from "./cutomer.model";


@Injectable({ providedIn: 'root' })
export class CustomerService {

    customerData: Customer[] = [];

    constructor(private http: HttpClient) { }



    getCustomerData() {

        let searchParams = new HttpParams();
        return this.http
            .get<{ [key: string]: Customer }>(
                'assets/customer.json',
            )
            .pipe(
                map((responseData: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => {
                    const postArray: Customer[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            postArray.push({ ...responseData[key], id: key });
                        }
                    }
                    return postArray;
                })
            );
    }
}