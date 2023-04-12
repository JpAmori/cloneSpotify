import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { sub } from 'date-fns';
import { Subscription } from 'rxjs';
import { newMusic } from 'src/app/Common/factories';
import { IMusic } from 'src/app/Interfaces/IMusic';
import { SpotifyServiceService } from 'src/app/services/spotify-service.service';

@Component({
  selector: 'app-playlist-musics',
  templateUrl: './playlist-musics.component.html',
  styleUrls: ['./playlist-musics.component.scss']
})
export class PlaylistMusicsComponent implements OnInit, OnDestroy {

  music: IMusic[] = [];
  musicAtual: IMusic = newMusic();
  playIcon = faPlay;
  subs: Subscription[] = [];

  bannerImageUrl = '';
  bannerTex = '';

  constructor(
    private activeRoute: ActivatedRoute,
    private spotifyService: SpotifyServiceService
    ){}

  ngOnInit(): void {
    this.toObtainMusics();
  }

  ngOnDestroy(): void {
      this.subs.forEach(subs => subs.unsubscribe);
  }

  toObtainMusics(){
    const sub = this.activeRoute.paramMap.subscribe(async paramns => {
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
    console.log(playlistMusics)
  }

  async toObtainDadosArtist(artistId: string){

  }

}
