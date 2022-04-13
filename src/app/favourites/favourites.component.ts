import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  favourites: any[] =[];
  constructor(private musicService: MusicDataService) { }

  ngOnInit(): void {
    this.musicService.getFavourites().subscribe(data=>{
      this.favourites = data.tracks;
    })
  }

  removeFromFavourites(id: string){
    this.musicService.removeFromFavourites(id).subscribe(data=>{
      this.favourites = data.tracks;
    });
  }

}
