import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player/player.component';
import { RouterModule } from '@angular/router';
import { PlayerRoutes } from './player.router';
import { LeftPanelComponent } from 'src/app/Components/left-panel/left-panel.component';
import { ButtonMenuComponent } from 'src/app/Components/button-menu/button-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterUserComponent } from 'src/app/Components/footer-user/footer-user.component';
import { HomeComponent } from '../home/home.component';
import { TopArtistComponent } from 'src/app/Components/top-artist/top-artist.component';
import { RightPanelComponent } from 'src/app/Components/right-panel/right-panel.component';


@NgModule({
  declarations: [
    PlayerComponent,
    LeftPanelComponent,
    ButtonMenuComponent,
    FooterUserComponent, 
    HomeComponent, 
    TopArtistComponent,
    RightPanelComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(PlayerRoutes),
  ]
})
export class PlayerModule { }
