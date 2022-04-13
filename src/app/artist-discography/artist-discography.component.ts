import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import albumData from '../data/SearchResultsAlbums.json';
import artistData from '../data/SearchResultsArtist.json';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {
  id: String = "";
  public albums: any;
  public artist: any;
  paramSub: any;
  artistSub: any;
  albumSub: any;

  constructor(private route: ActivatedRoute, private musicService: MusicDataService) { }

  ngOnInit(): void {
    this.paramSub = this.route.params.subscribe((param: Params) =>{
      this.id = param['id'];

      this.artistSub = this.musicService.getArtistById(this.id).subscribe(data =>{
        this.artist = data;
      });

      this.albumSub = this.musicService.getAlbumsByArtistId(this.id).subscribe(data =>{
        this.albums = data.items.filter((curValue, index, self) => self.findIndex(t => t.name.toUpperCase() === curValue.name.toUpperCase()) === index);
      });
    });

  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();
    this.artistSub.unsubscribe();
    this.albumSub.unsubscribe();
  }

}
