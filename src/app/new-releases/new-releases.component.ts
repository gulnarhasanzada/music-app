import { Component, OnInit } from '@angular/core';
import data from '../data/NewReleasesAlbums.json';
import { MusicDataService } from '../music-data.service';


@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit {

  public releases: any;
  public releasesSub:any;

  constructor(private musicService: MusicDataService) { }

  ngOnInit(): void {
    this.releasesSub = this.musicService.getNewReleases().subscribe(data=>{
      this.releases = data.albums.items;
    })
  }

  ngOnDestroy() {
    this.releasesSub.unsubscribe();
  }

}
