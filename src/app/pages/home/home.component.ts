import { Component, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { IMusic } from 'src/app/Interfaces/IMusic';
import { SpotifyServiceService } from 'src/app/services/spotify-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  musics: IMusic[] = []

  //Icons
  iconPlay = faPlay;

  constructor(private spotifyService: SpotifyServiceService){}

  ngOnInit(): void {
    this.searchMusics()  
  }

  async searchMusics(){
    this.musics = await this.spotifyService.searchMusics();
    
  }

  toObtainArtist(music: IMusic){
    return music.artists.map(artist => artist.name).join(',')
  }

  async execMusic(music: IMusic){
    await this.spotifyService.playMusic(music.id)
  }

}
