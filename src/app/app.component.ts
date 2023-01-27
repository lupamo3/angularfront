import { Component, OnInit } from '@angular/core';
import { AuthService } from './Authentication/shared/auth.service';
import { Subscription, Observable } from 'rxjs';
import { ACrudService } from './Authentication/shared/acrud.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  x
  ProfieData: { uname: any; desc: string; email: string; name: any; created_date: Date; imgurl: Observable<string>; isProfileSet: boolean };
  isprofileSet: boolean = false
  username: string
  private userSub: Subscription;
  allpostcount: number = 0;
  isemailverfied: boolean

  isloading: boolean = false
  constructor(private authService: AuthService, private acrud: ACrudService, private router: Router) {
    this.acrud.username.subscribe(d => {
      this.username = d

    })
  }
  title = 'write-your-heart-out';


  ngOnInit() {



    if (this.isloading) {
      window.onscroll = function () { myFunction() };

      // Get the header
      var header = document.getElementById("myHeader");

      // Get the offset position of the navbar
      var sticky = header.offsetTop;

      // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
      function myFunction() {
        if (window.pageYOffset > sticky) {
          header.classList.add("sticky");
        } else {
          header.classList.remove("sticky");
        }
      }
    }



    this.getAllPosts()

  }
  getAllPosts() {
    this.isloading = true
    this.acrud.getAllData()
      .subscribe(data => {
        this.isloading = false

      })
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
