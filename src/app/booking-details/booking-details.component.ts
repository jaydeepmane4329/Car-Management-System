import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.services';
import { BokkingService } from '../booking/bokking.service';


@Component({
    selector: 'app-booking-details',
    templateUrl: './booking-details.component.html',
    styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {

    bookingForm: FormGroup | any
    actionBtn: string = 'save';
    myControl = new FormControl
    value = '';
    editData: any = {};

    options: string[] = ['i20', 'i10', 'swift', 'wagnor'];
    constructor(private formBuilder: FormBuilder, private bookingService: BokkingService, private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

    ngOnInit() {

        if (localStorage.getItem('user') === 'true') {
            this.authService.isAuth.next(true);
            this.router.navigate(['bookingDetails'])
        }

        this.bookingForm = this.formBuilder.group({
            username: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            adults: ['', Validators.required],
            child: ['', Validators.required],
            CarDetails: this.myControl,
            pickUp: ['', Validators.required],
            pickUpAddress: ['', Validators.required],
            radio: ['', Validators.required],
            DropOffAddress: [''],
            DropOff: ['', Validators.required]
        })

        this.bookingService.editData.subscribe(res => {

        })
    }

    onSubmit() {


        const formData = new FormData();

        formData.append('username', this.bookingForm.get('username').value);
        formData.append('firstname', this.bookingForm.get('firstname').value);
        formData.append('lastname', this.bookingForm.get('lastname').value);
        formData.append('adults', this.bookingForm.get('adults').value);
        formData.append('child', this.bookingForm.get('child').value);
        formData.append('noofpassangers', this.bookingForm.get('noofpassangers'));
        formData.append('pickUp', this.bookingForm.get('pickUp').value);
        formData.append('pickUpAddress', this.bookingForm.get('pickUpAddress').value);
        formData.append('radio', this.bookingForm.get('radio').value);
        formData.append('DropOffAddress', this.bookingForm.get('DropOffAddress').value);
        formData.append('DropOff', this.bookingForm.get('DropOff').value);



    }

    dateChange() {
        if (this.bookingForm.value.pickUp > this.bookingForm.value.DropOff) {
            alert("Drop off date should be greater than pickup")
            this.bookingForm.invalid = true;
        }
    }

    onChange() {
        if (this.bookingForm.value.radio === '1') {
            this.value = this.bookingForm.value.pickUpAddress;
        }
    }


    addCustomer() {
        this.bookingService.postBookings(this.bookingForm.value);
        this.router.navigate(['booking'])
        console.log(this.myControl)
        console.log(this.bookingForm)
        this.bookingForm.invalid = true;

    }
}
