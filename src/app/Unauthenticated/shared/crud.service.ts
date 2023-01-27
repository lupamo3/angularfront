import { Injectable } from '@angular/core';
import { UPost } from './UPost.model';
import { finalize, catchError } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  selectedFile: any | null;
  currentDate = new Date();
  downloadurlchange: Subject<any> = new Subject<any>();
  filepath: string
  uid: any;
  uname: any;
  constructor(
    private router: Router,
  ) { }

  handleError(error: any) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getdata(data) {
    this.selectedFile = data

  }

  sendUidandUname(uname, id) {
    this.uid = id
    this.uname = uname
  }



}

