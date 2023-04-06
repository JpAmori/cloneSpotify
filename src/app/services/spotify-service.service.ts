import { Injectable } from '@angular/core';
import { SpotifyConfig } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { IUser } from '../Interfaces/IUser';
import { SpotifyPlaylistforPlaylist, SpotifyUserforUser } from '../Common/spotifyHelper';
import { IPlaylist } from '../Interfaces/IPlaylist';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SpotifyServiceService {

  spotifyAPI: Spotify.SpotifyWebApiJs = null;
  user: IUser;

  constructor(private router: Router) {
    this.spotifyAPI = new Spotify();
    
  }

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

  async toObtainDadosUser(){
    const userInfo = await this.spotifyAPI.getMe();
    this.user = SpotifyUserforUser(userInfo);
  }

  toObtainURLLogin(){
    const authEndpoin = `${SpotifyConfig.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfig.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfig.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfig.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;

    return authEndpoin + clientId + redirectUrl + scopes + responseType; 
  }

  toObtainTokenUrlCallback(){
    if(!window.location.hash)
      return '';
    
    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  toDefineAcessToken(token: string){
    this.spotifyAPI.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async searchPlaylists(offset = 0, limit = 25): Promise<IPlaylist[]>{
    const playlists = await this.spotifyAPI.getUserPlaylists(this.user.id, { offset, limit });
    return playlists.items.map(SpotifyPlaylistforPlaylist);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
