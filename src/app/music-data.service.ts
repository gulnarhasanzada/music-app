import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';

import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {
  favouritesList: any =[];
  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) { }  

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<SpotifyApi.ListOfNewReleasesResponse>("https://api.spotify.com/v1/browse/new-releases", { headers: { "Authorization": `Bearer ${token}` } });
      }));
  }

  getArtistById(id: String): Observable<SpotifyApi.SingleArtistResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<SpotifyApi.SingleArtistResponse>("https://api.spotify.com/v1/artists/"+id, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getAlbumsByArtistId(id: String): Observable<SpotifyApi.ArtistsAlbumsResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<SpotifyApi.ArtistsAlbumsResponse>("https://api.spotify.com/v1/artists/"+id + "/albums?o	include_groups=album,single&limit=50", { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getAlbumById(id: String): Observable<SpotifyApi.SingleAlbumResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<SpotifyApi.SingleAlbumResponse>("https://api.spotify.com/v1/albums/"+id, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  searchArtists(searchString: String): Observable<SpotifyApi.ArtistSearchResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<SpotifyApi.ArtistSearchResponse>("https://api.spotify.com/v1/search?q="+ searchString + "&type=artist&limit=50", { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  addToFavourites(id:String){ 
    let success = true;
    if(!id || this.favouritesList.length >=50){
      success = false;
    }else{
      this.favouritesList.push(id);
    }
    return success;
  }
  
  removeFromFavourites(id:String){
    const index = this.favouritesList.indexOf(id);
    this.favouritesList.splice(index,1);
    return this.getFavourites();
  }

  getFavourites(): Observable<any>{
    if(this.favouritesList.length > 0){
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<any>("https://api.spotify.com/v1/tracks?ids=" + this.favouritesList.join(), { headers: { "Authorization": `Bearer ${token}` } });
      }));
    }else{
      return new Observable(o=>{o.next([])});
    }
  }
}