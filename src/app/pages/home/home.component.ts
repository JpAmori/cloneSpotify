import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusic } from 'src/app/Common/factories';
import { IMusic } from 'src/app/Interfaces/IMusic';
import { PlayerServiceService } from 'src/app/services/player-service.service';
import { SpotifyServiceService } from 'src/app/services/spotify-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{

  musics: IMusic[] = [];
  musicCurrent: IMusic = newMusic();

  subscribes: Subscription[] = [];

  //Icons
  iconPlay = faPlay;

  constructor(
    private spotifyService: SpotifyServiceService, 
    private playerService: PlayerServiceService)
    {}

  ngOnInit(): void {
    this.searchMusics();
    this.toObtainCurrentMusic();
  }

  ngOnDestroy(): void {
    this.subscribes.forEach(sub => sub.unsubscribe())
  }

  async searchMusics(){
    this.musics = await this.spotifyService.searchMusics();
    
  }

  toObtainArtist(music: IMusic){
    return music.artists.map(artist => artist.name).join(',')
  }

  async execMusic(music: IMusic){
    await this.spotifyService.playMusic(music.id)
    this.playerService.toDefineCurrentMusic(music)
  }

  toObtainCurrentMusic(){
    const sub = this.playerService.currentMusic.subscribe(music => {
      this.musicCurrent = music;
    });
    
    this.subscribes.push(sub);
  }

}
