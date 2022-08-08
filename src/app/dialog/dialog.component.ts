import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../customer/customer.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  customerForm: FormGroup | any;
  file: File | any;
  actionBtn: string = 'save';

  createdUserDate: Date | any;

  constructor(private formBuilder: FormBuilder, private customerService: CustomerService, private dilogref: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      licenceImage: ['', Validators.required],
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      licencenumber: ['', Validators.required],
      licenceExpiryDate: ['', Validators.required],
      address: ['', Validators.required],
      addhar: ['', Validators.required],
      mobile: ['', Validators.required]

    })

    if (this.editData) {
      this.actionBtn = 'update'
      this.customerForm.controls['licenceImage'].setValue(this.editData.licenceImage);
      this.customerForm.controls['username'].setValue(this.editData.username);
      this.customerForm.controls['firstname'].setValue(this.editData.firstname);
      this.customerForm.controls['lastname'].setValue(this.editData.lastname);
      this.customerForm.controls['emailId'].setValue(this.editData.emailId);
      this.customerForm.controls['licencenumber'].setValue(this.editData.licencenumber);
      this.customerForm.controls['licenceExpiryDate'].setValue(this.editData.licenceExpiryDate);
      this.customerForm.controls['address'].setValue(this.editData.address);
      this.customerForm.controls['addhar'].setValue(this.editData.addhar);
      this.customerForm.controls['mobile'].setValue(this.editData.mobile);


      //  this.customerForm.controls[]

    }
    console.log(this.editData)
  }

  url: any = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  onselectFile(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = reader.result;
      }

      this.file = <File>e.target.files[0];
      // this.customerForm.get('licenceImage').setValue(file);
      console.log(this.file);

    }
  }

  onSubmit() {
    const formData = new FormData();


    formData.append('myfile', this.customerForm.get('licenceImage').setValue(this.url));
    formData.append('username', this.customerForm.get('username').value);
    formData.append('firstname', this.customerForm.get('firstname').value);
    formData.append('lastname', this.customerForm.get('lastname').value);
    formData.append('emailId', this.customerForm.get('emailId').value);
    formData.append('licencenumber', this.customerForm.get('licencenumber').value);
    formData.append('licenceExpiryDate', this.customerForm.get('licenceExpiryDate').value)
    formData.append('address', this.customerForm.get('address').value);
    formData.append('addhar', this.customerForm.get('addhar').value);
    formData.append('mobile', this.customerForm.get('mobile').value);
  }


  addCustomer() {
    console.log(this.customerForm)
    if (!this.editData) {
      if (this.customerForm.valid) {
        this.customerService.postCustomer(this.customerForm.value)
          .subscribe({
            next: (res) => {
              alert("customer Added Succesfully")
              this.customerForm.reset();
              this.dilogref.close('save')

            }, error: () => {
              alert('Error in adding customer')
            }
          })
      }
    } else {
      this.updateCustomers()
    }
  }

  updateCustomers() {
    this.customerService.putCustomer(this.customerForm.value, this.editData.id).subscribe({
      next: (res) => {
        console.log(res)
        alert('customer Updateded Successfully');
        this.customerForm.reset();
        this.dilogref.close('update');
      }, error: (error) => {
        alert('Error while updating')
      }
    })
  }
}
