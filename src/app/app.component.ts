import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web422-a4';
  searchString: String ="";

  constructor(private router: Router){}

  handleSearch(){
    this.router.navigate(['/search?q=',this.searchString]);
    this.searchString ="";
  }
}
