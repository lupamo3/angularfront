import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { EmployeeInfo } from 'src/app/models/employeeinfo.ts';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


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

  form: FormGroup;


  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      country: ['', Validators.required],
      holidayAllowance: ['', [Validators.required, this.validateHolidayAllowance.bind(this)]]
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
  , {validator: this.validateHolidayAllowance}
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

  onSubmit() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (this.form.valid) {
      const body = {
      first_name:this.form.value.firstName,
      last_name:this.form.value.lastName,
      date_of_birth:this.form.value.dateOfBirth,
      job_title:this.form.value.jobTitle,
      company:this.form.value.company,
      country:this.form.value.country,
      holiday_allowance: this.form.value.holidayAllowance || 0,
      id_number: this.form.value.idNumber || 0,
      working_hours: this.form.value.workingHours || 0,
      religion: this.form.value.religion || 'Christian',
      marital_status: this.form.value.maritalStatus || 'Single',
      number_of_children: this.form.value.numberOfChildren || 0,
    }
      this.http.post<any>(
        'http://127.0.0.1:8000/artisans/', body,{ headers }
      ).subscribe((response) =>{
        console.log("here", response);
        if (response.status === 200){
          this.router.navigate(["/"])
        }
      });
    }
}

getAllEmployees() {
  return this.http.get<any>('http://localhost:8000/artisans/');
}

validateHolidayAllowance(control: FormControl) {
  const country = this.form.get('country').value;
  if (country === 'kenya' && control.value < 21) {
    return { minAllowance: true };
  }
  if (country === 'tanzania' && control.value > 30) {
    return { maxAllowance: true };
  }
  return null;
}

}
