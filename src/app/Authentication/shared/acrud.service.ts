import { Injectable } from '@angular/core';
import { UPost, LikeUser, LikeUserDetail } from 'src/app/Unauthenticated/shared/UPost.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CrudService } from 'src/app/Unauthenticated/shared/crud.service';
import { Subscription, Observable, BehaviorSubject, forkJoin, zip } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Profile, User1 } from './user.model';
import { ToastrService } from 'ngx-toastr';






@Injectable({
  providedIn: 'root'
})
export class ACrudService {


  postdata = {}
  uid: string

  d1 = []
  d2 = []
  d3 = []
  d4 = []

  url: string
  post_id

  list: any
  OthersUid = new BehaviorSubject<string>(null);
  pu = new BehaviorSubject<any>(null);
  pr = new BehaviorSubject<any>('');
  all = new BehaviorSubject<any>(this.d3);
  all3 = new BehaviorSubject<any>(this.d3);
  username = new BehaviorSubject<string>("");
  PostDataForLikeCount = new BehaviorSubject<number>(null);
  PostDataForLikedByUser = new BehaviorSubject<any>(null);
  db_key: string;
  x: Observable<{ title: string; desc: string; created_date?: Date; imgurl: string; category: string; subcategory?: string; name: string; privacy: string; id: string; }[]>;
  ProfieData: { id: string; uname: string; desc: string; email: string; name: string; created_date?: Date; imgurl: Observable<string>; isProfileSet: boolean };
  editedProfileData: { id: string; uname: string; desc: string; email: string; name: string; imgurl: Observable<string>; created_date?: Date; isProfileSet: boolean; };
  uname: any;
  id: any;
  commentData: { comment: string; commentOn: Date; commentByUserId: string; };
  acrud: any;
  featuredPost: any;
  featuredPostsorted: any[];





  constructor(private http: HttpClient,

    private ucrud: CrudService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) {





  }

  sortDesecending(Post) {


    Post.sort((a: any, b: any) =>
      b.created_date - a.created_date
    )


    return Post
  }

  createPost(value: UPost) {
    this.postdata = {
      title: value.title,
      nameToSearch: value.title.toLowerCase(),
      desc: value.desc,
      category: value.category,
      subcategory: value.subcategory,
      name: value.name,
      created_date: this.ucrud.currentDate,
      imgurl: this.ucrud.downloadURL,
      privacy: value.privacy,
      uid: this.id,
      uname: this.uname,

    }
    if (value.privacy == "true") {
      // then((d: any) => {
      //   this.uid = d
      //   this.http.post(
      //     `https://write-your-heart-out-b338b.firebaseio.com/post/${this.uid}/public.json`,
      //     this.postdata
      //   )
      //     .subscribe(responseData => {

      //       this.router.navigate(['']);
      //       this.showSuccess();
      //     }
      //       , err => {

      //       })
      //     ;
      // })


    }
    else {

      this.http.post(
        `https://write-your-heart-out-b338b.firebaseio.com/post//${this.uid}/private.json`,
        this.postdata
      )
        .subscribe(responseData => {

          this.router.navigate(['']);
        });
    }
  }
  getPublicPost(): Observable<UPost[]> {
    return this.http.get<UPost[]>(`https://write-your-heart-out-b338b.firebaseio.com/post/${this.uid}/public.json`)

  }

  getPrivatePost(): Observable<UPost[]> {
    return this.http.get<UPost[]>(`https://write-your-heart-out-b338b.firebaseio.com/post/${this.uid}/private.json`)

  }

  getAllData() {
    let x = this.http.get<UPost[]>(`https://write-your-heart-out-b338b.firebaseio.com/post/${this.uid}/public.json`)
    let y = this.http.get<UPost[]>(`https://write-your-heart-out-b338b.firebaseio.com/post/${this.uid}/private.json`)
    return forkJoin(x, y)


  }


  getDemo2() {
    this.http.get<UPost[]>(`https://write-your-heart-out-b338b.firebaseio.com/post/${this.uid}/public.json`)
      .pipe(
        map(responseData => {
          const postsArray: UPost[] = [];
          for (const key in responseData) {

            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key] });
            }
          }
          return postsArray;
        })
      )
      .subscribe(posts => {
        this.pu.next(posts)
        this.d2 = posts
        return this.d2;
      });
  }


  deletePublicPost(postdata: {}, c: Observable<void>) {
    c.subscribe(x => {
      this.http.delete(
        `https://write-your-heart-out-b338b.firebaseio.com/post/${this.uid}/public/${this.db_key}.json`)
        .subscribe(d => {
          this.router.navigate(['myposts']);
        })
    })
  }



  Create_Private_Post(postdata: {}) {
    this.http.post(
      `https://write-your-heart-out-b338b.firebaseio.com/post/${this.uid}/private.json`,
      this.postdata
    )
      .subscribe(responseData => {


      });
  }

  Create_Public_Post(postdata: {}) {
    this.http.post(
      `https://write-your-heart-out-b338b.firebaseio.com/post/${this.uid}/public.json`,
      postdata
    )
      .subscribe(responseData => {

      });
  }





  showSuccess() {
    this.toastr.success('Post Added Successfully', 'Success', {
      timeOut: 20000
    });
  }


  showSuccessDelete() {
    this.toastr.success('Post Deleted Successfully', 'Success', {
      timeOut: 20000
    });
  }
}

