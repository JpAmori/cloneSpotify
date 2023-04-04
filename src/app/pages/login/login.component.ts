import { Component, OnInit } from '@angular/core';
import { SpotifyServiceService } from 'src/app/services/spotify-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private spotifyService: SpotifyServiceService
  ){}

  ngOnInit(): void {
    this.checkTokenURL();
  }

  checkTokenURL(){
    const token = this.spotifyService.toObtainTokenUrlCallback();
    if(!!token){
      this.spotifyService.toDefineAcessToken(token);

    } 
  }

  openedLogin(){
    window.location.href = this.spotifyService.toObtainURLLogin();
  }


}
