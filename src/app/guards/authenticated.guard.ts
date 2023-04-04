import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyServiceService } from '../services/spotify-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanLoad {

  constructor(private router: Router, 
    private spotifyService: SpotifyServiceService
    ){

  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const token = localStorage.getItem('token');

      if(!token){
        this.unauthenticated();
        return false;
      }
    
    return new Promise((res) => {
      const userCreated = this.spotifyService.initializeUser()

      if(userCreated){
        res(true);
      }else{
        res(this.unauthenticated());
      }
    })

  }

  unauthenticated(){
    localStorage.clear();
    this.router.navigate(['/login']);
    return false;
  }
}
