import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-artist-itens',
  templateUrl: './artist-itens.component.html',
  styleUrls: ['./artist-itens.component.scss']
})
export class ArtistItensComponent implements OnInit {

  @Input()
  imageSrc: string = '';

  @Input()
  name: string = '';

  @Output()
  click = new EventEmitter<void>();

  constructor(){}

  ngOnInit(): void {
      
  }

  onClick(){
    this.click.emit();
  }
}
