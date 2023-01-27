import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild
} from '@angular/router';

import { Injectable } from '@angular/core';


import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard{
  constructor(private authService: AuthService, private router: Router,
  ) { }



}
