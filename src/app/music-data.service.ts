import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';
import { environment } from './../environments/environment';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

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

  addToFavourites(id:string) {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.put(`${environment.userAPIBase}/favourites/${id}`,{
        "_id": id
        }, { headers: { "Authorization": `Bearer ${token}` } });
    }));
      
  }
  
  removeFromFavourites(id:string): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.delete<[String]>(`${environment.userAPIBase}/favourites/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
    
  }
  
  getFavourites(): Observable<any> {
    return this.http.get<[String]>(`${environment.userAPIBase}/favourites/`).pipe(mergeMap(favouritesArray => {
      if(favouritesArray.length > 0){
        return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
          return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${favouritesArray.join()}`, { headers: { "Authorization": `Bearer ${token}` } });
        }));
      }else{
        return new Observable(o=>o.next({tracks: []}));
      }
    }));
  }
}