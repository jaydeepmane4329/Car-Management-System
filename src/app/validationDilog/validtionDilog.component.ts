import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BokkingService } from '../booking/bokking.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
    selector: 'app-validationDilog',
    templateUrl: './validationDilog.component.html',
    styleUrls: ['./validationDilog.component.css'],
})
export class ValidationDilog implements OnInit {
    value: any;
    constructor(
        private formBuilder: FormBuilder,
        private bookingService: BokkingService,
        private router: Router,
        private dilogref: MatDialogRef<ValidationDilog>
    ) { }

    username: boolean = false;
    bookingUsername: FormGroup | any;
    usernameExists: boolean = false;

    ngOnInit(): void {
        this.bookingUsername = this.formBuilder.group({
            username: ['', Validators.required],
        });
    }

    onSubmit() {
        const formData = new FormData();
        formData.append('username', this.bookingUsername.get('username').value);
    }

    addBooking() {
        this.bookingService.editDataValidation.next(false);
        this.usernameExists = false;
        this.bookingService.getBookings().subscribe(res => {
            res.forEach((item: any) => {
                if (item.username === this.bookingUsername.value.username) {
                    this.usernameExists = true;
                } else {
                    localStorage.setItem('userExist', this.bookingUsername.value.username)
                }
            });
            if (!this.usernameExists) {
                this.dilogref.close()
                this.router.navigate(['bookingDetails'])
            }
        });
    }
}
