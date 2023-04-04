import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player/player.component';
import { RouterModule } from '@angular/router';
import { PlayerRoutes } from './player.router';
import { LeftPanelComponent } from 'src/app/Components/left-panel/left-panel.component';
import { ButtonMenuComponent } from 'src/app/Components/button-menu/button-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    PlayerComponent,
    LeftPanelComponent,
    ButtonMenuComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(PlayerRoutes),
  ]
})
export class PlayerModule { }
