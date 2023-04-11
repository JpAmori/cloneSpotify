import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyServiceService } from 'src/app/services/spotify-service.service';

@Component({
  selector: 'app-playlist-musics',
  templateUrl: './playlist-musics.component.html',
  styleUrls: ['./playlist-musics.component.scss']
})
export class PlaylistMusicsComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyServiceService
  ){}

  ngOnInit(): void {
      
  }

}
