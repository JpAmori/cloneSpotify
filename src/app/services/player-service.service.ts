import { Injectable } from '@angular/core';
import { IMusic } from '../Interfaces/IMusic';
import { newMusic } from '../Common/factories';
import { BehaviorSubject, Subject } from 'rxjs';
import { SpotifyServiceService } from './spotify-service.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerServiceService {

  currentMusic = new BehaviorSubject<IMusic>(newMusic());
  timerId: any = null;

  constructor(private spotifyService: SpotifyServiceService) { 
    this.collectCurrentMusic();
  }

  // Coletando Musica Atual e Checando com o timer se ainda é a musica atual 
  async collectCurrentMusic(){
    clearTimeout(this.timerId);

    const musicCurrent = await this.spotifyService.getCurrentMusic(); 
    this.toDefineCurrentMusic(musicCurrent);

    this.timerId = setInterval(async () => {
      await this.collectCurrentMusic();
    }, 1000);
  }

  // Definindo a Musica que deve ser tocada
  toDefineCurrentMusic(musicCurrent: IMusic){
    this.currentMusic.next(musicCurrent);
  }
}
