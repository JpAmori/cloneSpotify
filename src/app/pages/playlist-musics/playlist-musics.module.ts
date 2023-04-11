import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistMusicsComponent } from './playlist-musics.component';
import { PlaylistMusicsRoutes } from './playlist-musics.routes';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PlaylistMusicsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PlaylistMusicsRoutes)
  ]
})
export class PlaylistMusicsModule implements OnInit {
  
  constructor(){}

  ngOnInit(): void{}
}
