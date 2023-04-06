import { Component, OnInit } from '@angular/core';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { IUser } from 'src/app/Interfaces/IUser';
import { SpotifyServiceService } from 'src/app/services/spotify-service.service';

@Component({
  selector: 'app-footer-user',
  templateUrl: './footer-user.component.html',
  styleUrls: ['./footer-user.component.scss']
})
export class FooterUserComponent implements OnInit{

  user: IUser = null;
  exitIcon = faSignOut;

  constructor(
    private spotifyService: SpotifyServiceService
  ){}

  ngOnInit(): void {
    this.user = this.spotifyService.user;
  }

  logoutUser(){
    this.spotifyService.logout();
  }
}
