import { Component, OnInit } from '@angular/core';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from 'src/app/Interfaces/IPlaylist';
import { SpotifyServiceService } from 'src/app/services/spotify-service.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit {


  playlists: IPlaylist[] = [];

  // Icons
  homeIcon = faHome;
  searchIcon = faSearch;
  artistIcon = faGuitar;
  playlistIcon = faMusic;
  
  menuSelected = 'Home'

  constructor(private spotifyService: SpotifyServiceService){}

  ngOnInit(): void {
      this.searchPlaylist();
  }

  buttonClick(button: string){
    this.menuSelected = button;
  }

  async searchPlaylist(){
    this.playlists = await this.spotifyService.searchPlaylists();
  }

}
