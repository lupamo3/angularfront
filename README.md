## Frontend Angular Manufacturing resource planner Application
### This application fetches data from a django rest-framework backend and displays it on a dashboard using a Bootstrap form.

##### Getting Started
```
Clone the repository: git clone https://github.com/lupamo3/angularfront/tree/main/src
Install the dependencies: npm install
Start the application: ng serve
Navigate to http://localhost:4200/ in your browser
```

#### Features
```
Fetches data from a backend using the HttpClient module
Displays the data on a dashboard using a Bootstrap form
Uses a custom validator to validate form input
Dependencies
```

### This application requires the following dependencies:
```
Angular
Bootstrap
HttpClient
```

#### Acknowledgements
This application was built using the Angular Quickstart guide.

#### Troubleshooting
If you encounter the error "No pipe found with name 'date'" you need to import date pipe in your component and use it in your template.

```
**Copy code**
import { DatePipe } from '@angular/common';

constructor(private datePipe: DatePipe) {}
```

Copy code
{{ data | date: 'yyyy-MM-dd' }}
