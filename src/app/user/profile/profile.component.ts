import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { EmployeeInfo } from 'src/app/models/employeeinfo.ts';
import * as moment from 'moment';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  validation_messages = {
    'firstName': [
      { type: 'required', message: 'First name is required.' }
    ],

    'lastName': [
      { type: 'required', message: 'Last name is required.' },
    ],
    'name': [
      { type: 'required', message: 'Name is required.' },
    ],
    'dateOfBirth': [
      { type: 'required', message: 'Date of birth is required.' },
    ],
    'holidayAllowance': [
      { type: 'required', message: 'Holiday allowance is required.' },
    ],
    'maritalStatus': [
      { type: 'required', message: 'Marital status is required.' },
    ],
    'idNumber': [
      { type: 'required', message: 'ID number is required.' },
    ],
    'numberOfChildren': [
      { type: 'required', message: 'Number of children is required.' },
    ],
    'workingHours': [
      { type: 'required', message: 'Working hours is required.' },
    ],
    'religion': [
      { type: 'required', message: 'Religion is required.' },
    ],
  }

  countryControl = new UntypedFormControl();
  countries = ['Kenya', 'Uganda', 'Tanzania'];
  form: UntypedFormGroup;


  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: UntypedFormBuilder,
  ) {
    this.form = this.fb.group({
      country: ['', Validators.required],
      holidayAllowance: new UntypedFormControl(null, [
        Validators.min(21),
        Validators.max(30)
      ])
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
  ,
  //  {validator: this.validateHolidayAllowance}
  );

  }
  onCountryChange() {
    const country = this.form.get('country').value;
    if (country === 'Kenya') {
        this.form.addControl('idNumber', new UntypedFormControl());
        this.form.addControl('maritalStatus', new UntypedFormControl());
        this.form.get('holidayAllowance').setValidators([Validators.required, Validators.min(21)]);
    } else if (country === 'Uganda') {
        this.form.addControl('maritalStatus', new UntypedFormControl());
        this.form.addControl('numberOfChildren', new UntypedFormControl());
        this.form.get('holidayAllowance').clearValidators();
    } else if (country === 'Tanzania') {
        this.form.get('holidayAllowance').setValidators([Validators.required, Validators.max(30)]);
        this.form.addControl('workingHours', new UntypedFormControl());
        this.form.addControl('religion', new UntypedFormControl());
    }
    this.form.updateValueAndValidity();
}


  onSubmit() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const date = moment(this.form.value.dateOfBirth).format("DD-MM-YYYY");
    const body = {
      first_name:this.form.value.firstName,
      last_name:this.form.value.lastName,
      date_of_birth:date,
      country:this.form.value.country,
      holiday_allowance: this.form.value.holidayAllowance || 0,
      id_number: this.form.value.idNumber || 0,
      working_hours: this.form.value.workingHours || 0,
      religion: this.form.value.religion || 'Christian',
      marital_status: this.form.value.maritalStatus || 'Single',
      number_of_children: this.form.value.numberOfChildren || 0,
  }
    if (this.form.valid) {
      this.http.post<any>(
        'http://127.0.0.1:8000/artisans/', body,{ headers }).subscribe(() =>{
          this.router.navigate(["/myposts"])
    });
    }
    else {
      console.log("invalid form")
    }
}

getAllEmployees() {
  return this.http.get<any>('http://localhost:8000/artisans/');
}

}
