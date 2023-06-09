import { HtmlTagDefinition } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Icon, IconProp, icon } from '@fortawesome/fontawesome-svg-core';
import { faPause, faPlay, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusic } from 'src/app/Common/factories';
import { IMusic } from 'src/app/Interfaces/IMusic';
import { PlayerServiceService } from 'src/app/services/player-service.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  constructor(private playerService: PlayerServiceService){}

  music: IMusic = newMusic();
  subs: Subscription[] = [];

  // Icones 
  backIcon = faStepBackward;
  nextIcon = faStepForward;
  playIcon = faPlay;
  pauseIcon = faPause;

  ngOnInit(): void {
    this.toObtainMusic();
  }

  ngOnDestroy(): void {
      this.subs.forEach(sub => sub.unsubscribe())
  }

  toObtainMusic(){
    const sub = this.playerService.currentMusic.subscribe(x => {
      this.music = x;
    })
    this.subs.push(sub)
  }

  playMusic(){
    this.playerService.goPlayMusic();
    const iconPlay = document.getElementById('play');
    const iconPause = document.getElementById('pause');
    iconPlay.classList.toggle('hide');
    iconPause.classList.remove('hide');
  }

  pauseMusic(){
    this.playerService.goPauseMusic();
    const iconPlay = document.getElementById('play');
    const iconPause = document.getElementById('pause');
    iconPlay.classList.remove('hide');
    iconPause.classList.toggle('hide');
  }

  backMusic(){
    this.playerService.goBackMusics();
  }

  nextMusic(){
    this.playerService.goNextMusic();
  }
}
