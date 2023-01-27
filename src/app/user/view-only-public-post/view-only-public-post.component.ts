import { Component, OnInit } from '@angular/core';
import { ACrudService } from 'src/app/Authentication/shared/acrud.service';
import { AuthService } from 'src/app/Authentication/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-only-public-post',
  templateUrl: './view-only-public-post.component.html',
  styleUrls: ['./view-only-public-post.component.css']
})
export class ViewOnlyPublicPostComponent implements OnInit {
  unameParam: string;
  PublicPosts: any[];
  PrivatePosts: any[];
  isFetching:Boolean=false;
  pbcount: number = 0
  prcount: number = 0;
  allcount: number = 0
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    let url = this.router.url;
    let urlpart = url.split("/")
    this.unameParam = urlpart[2]

  }


  sortDesecendingByDate(data) {
    return data.sort((a: any, b: any) =>
      <any>new Date(b.created_date) - <any>new Date(a.created_date)
    )
  }
}
