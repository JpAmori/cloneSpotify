import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent-searches',
  templateUrl: './recent-searches.component.html',
  styleUrls: ['./recent-searches.component.scss']
})
export class RecentSearchesComponent implements OnInit {

  recentsSearchs = [
    'Top Brasil',
    'Pagodeira',
    'Esquenta Sertanejo',
    'Pisadinha e Piseiro',
    'Trap Ouro'
  ]

  researchFild: string = '';

  constructor(){}

  ngOnInit(): void {
      
  }

  toDefineSearch(pesquisa: string){
    this.researchFild = pesquisa;
  }

  toLookFor(){
    this.researchFild = "aribaba daririba"
  }
}
