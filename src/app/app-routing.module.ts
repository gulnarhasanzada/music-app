import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AlbumComponent } from './album/album.component';
import { ArtistDiscographyComponent } from './artist-discography/artist-discography.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { LoginComponent } from './login/login.component';
import { NewReleasesComponent } from './new-releases/new-releases.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { GuardAuthService } from './guard-auth.service';


const routes: Routes = [
  { path: 'newReleases', component: NewReleasesComponent , canActivate: [GuardAuthService]},
  { path: 'artist/:id', component: ArtistDiscographyComponent , canActivate: [GuardAuthService]},
  { path: 'album/:id', component: AlbumComponent, canActivate: [GuardAuthService] },
  { path: 'search', component: SearchResultsComponent, canActivate: [GuardAuthService] },
  { path: 'favourites', component: FavouritesComponent, canActivate: [GuardAuthService] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent , canActivate: [GuardAuthService]},
  { path: '', redirectTo: '/newReleases', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
