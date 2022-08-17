import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.services';
import { BokkingService } from '../booking/bokking.service';
import { DataService } from '../shared/data.service';


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
    isEdit: boolean;
    dataEdit: any;
    options: string[] = ['i20', 'i10', 'swift', 'wagnor'];
    constructor(private formBuilder: FormBuilder, private bookingService: BokkingService, private router: Router, private route: ActivatedRoute, private authService: AuthService, private dataService: DataService) { }

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


        this.dataService.editData.subscribe(res => {
            this.dataEdit = res;
        })

        if (this.dataEdit) {
            this.actionBtn = 'update';
            this.bookingForm.controls['username'].setValue(this.dataEdit.username);
            this.bookingForm.controls['firstname'].setValue(this.dataEdit.firstname);
            this.bookingForm.controls['lastname'].setValue(this.dataEdit.lastname);
            this.bookingForm.controls['adults'].setValue(this.dataEdit.adults);
            this.bookingForm.controls['child'].setValue(this.dataEdit.child);
            this.bookingForm.controls['CarDetails'].setValue(this.dataEdit.CarDetails);
            this.bookingForm.controls['pickUp'].setValue(this.dataEdit.pickUp);
            this.bookingForm.controls['pickUpAddress'].setValue(this.dataEdit.pickUpAddress);
            this.bookingForm.controls['radio'].setValue(this.dataEdit.radio);
            this.bookingForm.controls['DropOffAddress'].setValue(this.dataEdit.DropOffAddress);
            this.bookingForm.controls['DropOff'].setValue(this.dataEdit.DropOff);
        }
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
        console.log(this.bookingForm)
        if (!this.dataEdit) {
            if (this.bookingForm.valid) {
                this.bookingForm["modifiedDate"] = new Date();
                this.bookingForm["createdname"] = this.bookingForm.value.username;
                this.bookingService.postBookings(this.bookingForm.value);
                this.router.navigate(['booking'])
                this.bookingForm.reset()
                this.bookingForm.invalid = true;
            }
        } else {
            this.updateBooking();
        }
    }

    updateBooking() {
        this.bookingForm.value.modifiedDate = new Date();
        this.bookingForm.value.modifiedname = this.bookingForm.value.username
        // this.bookingService.postBookings(this.bookingForm.value);
        this.dataService.editBookingDetails(this.dataEdit.id,this.bookingForm.value)
        // this.bookingForm.reset();
        this.router.navigate(['booking']);
    }
}
