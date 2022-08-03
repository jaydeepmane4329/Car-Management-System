import { Component, OnInit } from "@angular/core";
import { CustomerService } from "./customer.service";
import { Customer } from "./cutomer.model";
@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html'
})
export class Customers implements OnInit {

    customerData: Customer[] = [];
    constructor(private customerService: CustomerService) { }


    ngOnInit(): void {
        this.customerService.getCustomerData().subscribe(
            data => {
                this.customerData = data;
            }
        );
    }
}



