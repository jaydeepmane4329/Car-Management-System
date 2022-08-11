import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    constructor(private formBuilder: FormBuilder, private bookingService: BokkingService,private router:Router, private route :ActivatedRoute,private authService:AuthService ) { }

    ngOnInit(): void {
        this.bookingForm = this.formBuilder.group({
            username: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            noofpassangers: ['', Validators.required],
            phone: ['', Validators.required],
            carDetails: ['', Validators.required]
        })

        if (localStorage.getItem('user') === 'true') {
            this.authService.isAuth.next(true);
            this.router.navigate(['bookingDetails'])
        }
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
       this.bookingService.postBookings(this.bookingForm.value); 
       this.router.navigate(['booking'])
    }
}
