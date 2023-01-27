import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  x
  isprofileSet: boolean = false
  username: string
  allpostcount: number = 0;
  isemailverfied: boolean

  isloading: boolean = false
  constructor( private router: Router) { }

  ngOnInit() { }

  }
