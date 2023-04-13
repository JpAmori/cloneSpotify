import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusic } from 'src/app/Common/factories';
import { IMusic } from 'src/app/Interfaces/IMusic';
import { PlayerServiceService } from 'src/app/services/player-service.service';
import { SpotifyServiceService } from 'src/app/services/spotify-service.service';

@Component({
  selector: 'app-playlist-musics',
  templateUrl: './playlist-musics.component.html',
  styleUrls: ['./playlist-musics.component.scss']
})
export class PlaylistMusicsComponent implements OnInit, OnDestroy {

  musics: IMusic[] = [];
  musicCurrent: IMusic = newMusic();

  subs: Subscription[] = [];

  iconPlay = faPlay;
  bannerImageUrl = '';
  bannerTex = '';
  title = ''

  constructor(
    private activeRoute: ActivatedRoute,
    private spotifyService: SpotifyServiceService,
    private playerService: PlayerServiceService
    ){}

  ngOnInit(): void {
    this.toObtainMusics();
    this.toObtainCurrentMusic();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  toObtainCurrentMusic(){
    const sub = this.playerService.currentMusic.subscribe(music => {
      this.musicCurrent = music;
    });
    this.subs.push(sub);
  }

  toObtainMusics(){
    const sub = this.activeRoute.paramMap
    .subscribe(async paramns => {
      const type = paramns.get('type');
      const id = paramns.get('id');
      await this.toObtainDados(type, id);
    })
    this.subs.push(sub)
  }

  async toObtainDados(type: string, id: string){
    if(type == 'playlist'){
      await this.toObtainDadosPlaylist(id)
    }else{
      await this.toObtainDadosArtist(id);
    }
  }

  async toObtainDadosPlaylist(playlistId: string){
    const playlistMusics = await this.spotifyService.searchMusicsPlaylist(playlistId);
    this.setPageData(playlistMusics.name, playlistMusics.imageUrl, playlistMusics.musics);
    this.title = playlistMusics.name
  }

  async toObtainDadosArtist(artistId: string){
    
  }

  setPageData(bannerText: string, bannerImage: string, musics: IMusic[]){
    this.bannerImageUrl = bannerImage;
    this.bannerTex = bannerText;
    this.musics = musics;
  }

  async execMusic(music: IMusic){
    await this.spotifyService.playMusic(music.id)
    this.playerService.toDefineCurrentMusic(music)
  }

  toObtainArtist(music: IMusic){
    return music.artists.map(artist => artist.name).join(',')
  }

}
