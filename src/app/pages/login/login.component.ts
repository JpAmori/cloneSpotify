import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyServiceService } from 'src/app/services/spotify-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private spotifyService: SpotifyServiceService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.checkTokenURL();
  }

  checkTokenURL(){
    const token = this.spotifyService.toObtainTokenUrlCallback();
    if(!!token){
      this.spotifyService.toDefineAcessToken(token);
      this.router.navigate(['/player/home']);
    }
  }

  openedLogin(){
    window.location.href = this.spotifyService.toObtainURLLogin();
  }


}
