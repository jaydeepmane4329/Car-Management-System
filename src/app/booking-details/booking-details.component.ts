import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.services';
import { BokkingService } from '../booking/bokking.service';
import { DataService } from '../shared/data.service';
@Component({
    selector: 'app-booking-details',
    templateUrl: './booking-details.component.html',
    styleUrls: ['./booking-details.component.css'],
})
export class BookingDetailsComponent implements OnInit {
    bookingForm: FormGroup | any;
    actionBtn: string = 'save';
    myControl = new FormControl();
    value = '';
    valid = '';
    isEdit: boolean;
    activeUser: any;
    dataEdit: any;
    condition: boolean;
    currentDate: any;
    date = new Date().getDate();
    month = new Date().getMonth() + 1;
    year = new Date().getFullYear();
    options: string[] = ['i20', 'i10', 'swift', 'wagnor'];

    constructor(
        private formBuilder: FormBuilder,
        private bookingService: BokkingService,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private dataService: DataService
    ) { }

    ngOnInit() {
        this.activeUser = localStorage.getItem('activeUSer');
        this.valid = localStorage.getItem('userExist') || localStorage.getItem('username');
        this.currentDate = this.year + '-' + '0' + this.month + '-' + this.date;

        if (localStorage.getItem('user') === 'true' || localStorage.getItem('admin') === 'true') {
            this.authService.isAuth.next(true);
        }

        this.bookingService.editDataValidation.subscribe((res) => {
            this.condition = res;
        });

        this.dataService.editData.subscribe((res) => {
            this.dataEdit = res;
            this.bookingService.address.next(this.dataEdit.pickUpAddress);
            this.bookingService.username.next(this.dataEdit.username);
            console.log(res);
        });

        this.bookingForm = this.formBuilder.group({
            username: [
                { value: this.valid, disabled: this.valid },
                [Validators.required],
            ],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            adults: ['', Validators.required],
            child: ['', Validators.required],
            CarDetails: this.myControl,
            pickUp: ['', Validators.required],
            pickUpAddress: ['', Validators.required],
            radio: ['', Validators.required],
            DropOffAddress: [''],
            DropOff: ['', Validators.required],
        });

        if (this.condition) {
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
            this.bookingForm.controls['DropOffAddress'].setValue(this.dataEdit.pickUpAddress);
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
            alert('Drop off date should be greater than pickup');
            this.bookingForm.status = 'INVALID';
        }
    }

    onChange() {
        if (this.bookingForm.value.radio === '1') {
            this.value = this.bookingForm.value.pickUpAddress;
            document.getElementById('DropOff').setAttribute('disabled', 'true');
        } else {
            this.value = this.bookingForm.value = '';
            document.getElementById('DropOff').removeAttribute('disabled');
        }
    }

    addCustomer() {
        if (!this.condition) {
            if (this.bookingForm.value.pickUp < this.currentDate) {
                alert('Pick up date cannot be less than current date');
                this.bookingForm.status = 'INVALID';
                console.log(this.bookingForm.value.pickUp);
                console.log(this.currentDate);
            }
            if (this.bookingForm.valid) {
                this.bookingForm['modifiedDate'] = new Date();
                this.bookingForm.value.createdname = this.activeUser;
                this.bookingService.postBookings(
                    this.bookingForm.getRawValue(),
                    this.activeUser
                );
                this.router.navigate(['booking']);
                this.bookingForm.reset();
            }
        } else {
            this.updateBooking();
        }
    }

    cancle() {
        this.router.navigate(['booking']);
        localStorage.removeItem('userExist');
        localStorage.removeItem('username');
    }

    updateBooking() {
        this.bookingForm.value.modifiedDate = new Date();
        this.dataService.editBookingDetails(
            this.dataEdit.id,
            this.bookingForm.getRawValue(),
            this.activeUser
        );
        this.bookingForm.reset();
        this.router.navigate(['booking']);
        localStorage.removeItem('username');
    }
}
