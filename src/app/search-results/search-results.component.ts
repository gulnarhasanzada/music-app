import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  results: any;
  searchQuery: String = "";
  constructor(private route: ActivatedRoute, private musicService: MusicDataService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param: Params) => {
      this.searchQuery = param['q'];
      this.musicService.searchArtists(this.searchQuery).subscribe(data =>{
        this.results = data.artists.items.filter(item =>{
          return item.images.length > 0;
        });
      })
    });
  }

}
