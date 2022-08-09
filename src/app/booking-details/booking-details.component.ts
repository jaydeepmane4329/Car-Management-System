import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BokkingService } from '../booking/bokking.service';


@Component({
    selector: 'app-booking-details',
    templateUrl: './booking-details.component.html',
    styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {

    bookingForm: FormGroup | any
    actionBtn: string = 'save';
    constructor(private formBuilder: FormBuilder, private bookingService: BokkingService) { }

    ngOnInit(): void {
        this.bookingForm = this.formBuilder.group({
            username: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            noofpassangers: ['', Validators.required],
            phone: ['', Validators.required],
            carDetails: ['', Validators.required]
        })
    }

    onSubmit() {

        const formData = new FormData();

        formData.append('username', this.bookingForm.get('username').value);
        formData.append('firstname', this.bookingForm.get('firstname').value);
        formData.append('lastname', this.bookingForm.get('lastname').value);
        formData.append('noofpassangers', this.bookingForm.get('noofpassangers').value);
        formData.append('phone', this.bookingForm.get('phone').value);
        formData.append('carDetails', this.bookingForm.get('carDetails').value);

    }


    addCustomer() {
        const JSONDATA = JSON.stringify(this.bookingForm.value)
        
        this.bookingService.postBookings(JSONDATA)
            .subscribe({
                next: (res) => {
                    console.log(res)
                    alert("booking addded succesfully")
                    this.bookingForm.reset();
                }, error: () => {
                    alert("Error occuring while adding bookings")
                }
            })
    }
}
