import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { ActivatedRoute, Params } from '@angular/router';
import { MusicDataService } from '../music-data.service';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  public album: any;

  constructor(private sbService: MatSnackBar, private route: ActivatedRoute, private musicService: MusicDataService) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) =>{
      this.musicService.getAlbumById(param['id']).subscribe(data=>{
        this.album = data;
      })
    })
  }

  addToFavourites(trackID: string){
    this.musicService.addToFavourites(trackID).subscribe(res=>{
      this.sbService.open("Adding to Favourites...", "Done", { duration: 1500 });
    }, err=>{
      this.sbService.open("Unable to add song to Favourites", "Error", { duration: 1500 });
    })
  }

}
