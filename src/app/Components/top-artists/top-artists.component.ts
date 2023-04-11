import { Component, OnInit } from '@angular/core';
import { IArstist } from 'src/app/Interfaces/IArtist';
import { SpotifyServiceService } from 'src/app/services/spotify-service.service';

@Component({
  selector: 'app-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.scss']
})
export class TopArtistsComponent implements OnInit{

  constructor(private spotifyService: SpotifyServiceService){}

  ngOnInit(): void {
    this.searchArtists()
  }

  artists: IArstist[] = [];

  async searchArtists(){
    this.artists = await this.spotifyService.searchTopArtists(5)
  }

}
