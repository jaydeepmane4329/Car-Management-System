import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Customer } from "./cutomer.model";

@Injectable({ providedIn: 'root' })
export class CustomerService {

    constructor(private http: HttpClient) { }

    postCustomer(data: any) {
        return this.http.post<Customer>("http://localhost:3000/customerList/", data)
    }

    getCustomer() {
        return this.http.get<any>("http://localhost:3000/customerList/");
    }

    putCustomer(data: any, id: number) {
        return this.http.put<Customer>("http://localhost:3000/customerList/" + id, data);
    }

    deleteCustomer(id: number) {
        return this.http.delete<Customer>("http://localhost:3000/customerList/" + id);
    }
}