import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  imageSrc: string | ArrayBuffer;
  downloadURL: string;
  selectedFile: any;
  uploadPercent: Observable<number>;
  ProfileForm: FormGroup;

  countryControl = new FormControl();
  countries = ['Kenya', 'Uganda', 'Tanzania'];


  validation_messages = {
    'uname': [
      { type: 'required', message: 'Title is required.' }
    ],

    'email': [
      { type: 'required', message: 'Category is required.' },
    ],
    'name': [
      { type: 'required', message: 'Name is required.' },
    ]
  };
  href: string;
  profileReturned: any;
  x: string[];
  username: any;
  erroUsername: string;
  oldusername: any;
  usernamParam: string
  email: string
  form: FormGroup;


  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      country: this.countryControl,
      // holidayAllowance: new FormControl('', this.validateHolidayAllowance()),
      // other form controls
  });
  }


  ngOnInit(): void {
    this.form = this.fb.group({
      country: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      holidayAllowance: ['', Validators.required],
      maritalStatus: [''],
      idNumber: [''],
      numberOfChildren: [''],
      workingHours: [''],
      religion: ['']
  }
  // , {validator: this.validateHolidayAllowance}
  );

  }
  onCountryChange() {
    const country = this.form.get('country').value;
    if (country === 'Kenya') {
        this.form.addControl('idNumber', new FormControl());
        this.form.addControl('maritalStatus', new FormControl());
        this.form.get('holidayAllowance').setValidators([Validators.required, Validators.min(21)]);
    } else if (country === 'Uganda') {
        this.form.addControl('maritalStatus', new FormControl());
        this.form.addControl('numberOfChildren', new FormControl());
        this.form.get('holidayAllowance').clearValidators();
    } else if (country === 'Tanzania') {
        this.form.addControl('workingHours', new FormControl());
        this.form.addControl('religion', new FormControl());
        this.form.get('holidayAllowance').setValidators([Validators.required, Validators.max(30)]);
    }
    this.form.updateValueAndValidity();
}

  SetProfileForm(profiled4eturned: any) {
    this.imageSrc = profiled4eturned.imgurl
    this.downloadURL = profiled4eturned.imgurl
    this.ProfileForm.patchValue({

      uname: profiled4eturned.uname,
      desc: profiled4eturned.desc,
      name: profiled4eturned.name,
      email: this.email,

    })
  }
  onSubmit() {
    // if (this.form.valid) {
    //     // Call the API to submit the form data
    //     this.apiService.submitForm(this.form.value).subscribe(res => {
    //         console.log(res);
    //     }, err => {
    //         console.error(err);
    //     });
    // }
}

submitForm(formData: any) {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post('http://your-backend-url/submit-form', formData, { headers });
}

// validateHolidayAllowance(): Validators {
//   const country = this.form.get('country').value;
//     return Validators.compose([
//         (control: FormControl) => {
//             if (country === 'Kenya' && control.value < 21) {
//                 return { 'holidayAllowance': true };
//             }
//             if (country === 'Tanzania' && control.value > 30) {
//                 return { 'holidayAllowance': true };
//             }
//             if (country === 'Uganda') {
//                 return null;
//             }
//             return null;
//         }
//     ]);
// }


  CreateProfile() {
    this.ProfileForm = this.fb.group({
      imgurl: ['', Validators.required],
      email: [this.email, Validators.required],
      desc: [''],
      name: ['', Validators.required],
      uname: ['', Validators.required,],


    });

  }


  clearError() {
    this.erroUsername = ""
  }


  redirectTo(url: any) {

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
    setTimeout(() => {
      window.location.href = "";
    }, 1000)
  }
}
