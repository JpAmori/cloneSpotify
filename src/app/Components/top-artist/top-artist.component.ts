import { Component, OnInit } from '@angular/core';
import { newArtist } from 'src/app/Common/factories';
import { IArstist } from 'src/app/Interfaces/IArtist';
import { SpotifyServiceService } from 'src/app/services/spotify-service.service';

@Component({
  selector: 'app-top-artist',
  templateUrl: './top-artist.component.html',
  styleUrls: ['./top-artist.component.scss']
})
export class TopArtistComponent implements OnInit{

  topArtist: IArstist = newArtist();

  constructor(private spotifyService: SpotifyServiceService){}


  ngOnInit(): void {
    this.searchArtist();
  }

  async searchArtist(){
    const artists = await this.spotifyService.searchTopArtists(1);

    if(!!artists){
      this.topArtist = artists.pop()
    }
  }

  touchArtist(){
    
  }

}
