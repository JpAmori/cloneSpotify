import { Injectable } from '@angular/core';
import { SpotifyServiceService } from './spotify-service.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyPlayerServiceService{



  constructor(private spotifyService: SpotifyServiceService) { }

  

}
