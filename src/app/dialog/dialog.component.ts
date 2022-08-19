import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, PatternValidator } from '@angular/forms';
import { CustomerService } from '../customer/customer.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  customerForm: FormGroup | any;
  file: File | any;
  actionBtn: string = 'save';
  imgSize = false
  fileName: any;
  constructor(private formBuilder: FormBuilder, private customerService: CustomerService, private dilogref: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public editData: any, private router: Router) { }

  ngOnInit(): void {
    console.log(this.editData);
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
      this.url = this.editData.licenceImage
      this.fileName = this.editData.filename
      console.log(this.fileName)
      this.customerForm.controls['licenceImage'].setValue(this.fileName);
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
      this.fileName = this.file.name;
      console.log(this.fileName);
    }
  }

  onSubmit() {
    const formData = new FormData();


    formData.append('licenceImage', this.customerForm.get('licenceImage').setValue(this.url));
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
    if (this.customerForm.value.licenceExpiryDate < new Date()) {
      alert("Licence is Expired")
      this.customerForm.status = "INVALID";
    }

    if (this.file.size > 2097152) {
      this.imgSize = true;
      alert("Image Should be less than 2MB")
      this.router.navigate(['customers'])
      this.dilogref.close()
      alert("try again")
    }
    const jpg = this.file.type === 'image/jpeg'
    const png = this.file.type === 'image/png'
    if (jpg || png) {
    } else {
      alert('Image should be in jpg or png format')
      this.router.navigate(['customers'])
      this.dilogref.close()
      console.log('try again')
    }

    console.log(this.customerForm)
    if (!this.editData) {
      if (this.customerForm.valid) {
        this.customerForm.value["filename"] = this.fileName
        this.customerForm.value["createdDate"] = new Date();
        this.customerForm.value["modifiedDate"] = new Date();
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
    this.customerForm.value.modifiedDate = new Date();
    this.customerForm.value.createdDate = this.editData.createdDate;
    this.customerForm.value.licenceImage = this.url;
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
