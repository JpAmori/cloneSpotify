import { Injectable } from '@angular/core';
import { SpotifyConfig } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { IUser } from '../Interfaces/IUser';
import { SpotifyArtistforArtist, SpotifyPlaylist, SpotifyPlaylistforPlaylist, SpotifyTrackforTrack, SpotifyUserforUser } from '../Common/spotifyHelper';
import { IPlaylist } from '../Interfaces/IPlaylist';
import { Route, Router } from '@angular/router';
import { IArstist } from '../Interfaces/IArtist';
import { IMusic } from '../Interfaces/IMusic';
import { Artist, getArtistTopTracks } from 'spotify-web-sdk';

@Injectable({
  providedIn: 'root'
})
export class SpotifyServiceService {

  spotifyAPI: Spotify.SpotifyWebApiJs = null;
  user: IUser;

  constructor(private router: Router) {
    this.spotifyAPI = new Spotify();
    
  }

  // Inicializando o Usuário  
  async initializeUser(){
    if(!!this.user)
      return true;
    
    
    const token = localStorage.getItem('token');

    if(!token)
      return false
    
    try {

      this.toDefineAcessToken(token);
      await this.toObtainDadosUser();

      return !!this.user;

    }catch(ex){
      return false;
    }
  }

  // Obtendo os dados do Usuário
  async toObtainDadosUser(){
    const userInfo = await this.spotifyAPI.getMe();
    this.user = SpotifyUserforUser(userInfo);
  }

  // Buscando a URL de Login
  toObtainURLLogin(){
    const authEndpoin = `${SpotifyConfig.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfig.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfig.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfig.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    
    return authEndpoin + clientId + redirectUrl + scopes + responseType; 
  }

  // Retornando o Token
  toObtainTokenUrlCallback(){
    if(!window.location.hash)
      return '';
    
    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  // Definindo o Tokem de acesso 
  toDefineAcessToken(token: string){
    this.spotifyAPI.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  // Buscando as playlists
  async searchPlaylists(offset = 0, limit = 25): Promise<IPlaylist[]>{
    const playlists = await this.spotifyAPI.getUserPlaylists(this.user.id, { offset, limit });
    return playlists.items.map(SpotifyPlaylistforPlaylist);
  }

  // Buscando Musicas de uma Playlist
  async searchMusicsPlaylist(playlistId: string, offset = 0, limit = 50){
    const playlistSpotify = await this.spotifyAPI.getPlaylist(playlistId);

    if(!playlistSpotify){
      return null;
    }

    const playlist = SpotifyPlaylist(playlistSpotify);

    const musics = await this.spotifyAPI.getPlaylistTracks(playlistId, {offset, limit});
    playlist.musics = musics.items.map(music => SpotifyTrackforTrack(music.track as SpotifyApi.TrackObjectFull));

    return playlist;
  }

  // Buscando os melhores artistas
  async searchTopArtists(limit = 5): Promise<IArstist[]>{
    const artists = await this.spotifyAPI.getMyTopArtists({limit})
    return artists.items.map(SpotifyArtistforArtist)
  }

  // Procurando as musicas curtidas
  async searchMusics(offset = 0, limit = 50): Promise<IMusic[]>{
    const music = await this.spotifyAPI.getMySavedTracks({offset, limit});
    return music.items.map(x => SpotifyTrackforTrack(x.track))
  }

  // Dando play na musica 
  async playMusic(musicId: string){
    await this.spotifyAPI.queue(musicId);
    this.spotifyAPI.skipToNext();
  }

  // Coletando as melhores musicas do artista
  async playMusicforArtist(){
    await this.spotifyAPI.getArtistTopTracks
  }

  // Coletando a musica atual do Spotify
  async getCurrentMusic(): Promise<IMusic>{
    const music = await this.spotifyAPI.getMyCurrentPlayingTrack(); 
    
    return SpotifyTrackforTrack(music.item)
  }

  // Voltando a Musica
  async goBackMusic(){
    await this.spotifyAPI.skipToPrevious()
  }

  // Pulando para a Proxima musica
  async goNextMusic(){
    await this.spotifyAPI.skipToNext();
  }

  // Iniciando a Musica após o Pause
  async goPlayMusic(){
    await this.spotifyAPI.play();
  }

  // Pausando a Musica
  async goPauseMusic(){
    await this.spotifyAPI.pause();
  }

  // Saindo da Conta
  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
