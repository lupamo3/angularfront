import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.css']
})
export class UserPostComponent implements OnInit {
  selectedIndex: number = 0;

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isFetching = true;
  isAll = false;
  isPublic = false;
  isPrivate = false;
  url
  href: string
  error: string
  count_all: number = 0
  count_pr: number = 0
  count_pb: number = 0
  searchText;
  data: Object;
  providers: [DatePipe]


  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.href = this.router.url;
    this.url = this.href.split("/")
    this.url = this.url[2]




    this.route.params
      .subscribe(
        (params: Params) => {

          this.url = params['type']
          if (this.url === 'artisans') {
            this.getAllEmployees()
          }
        });

  }
  getAllEmployees() {
    this.http.get('http://127.0.0.1:8000/artisans/').subscribe(data => {
      this.data = data;
    });
  }



  ngOnDestroy() {}

}
