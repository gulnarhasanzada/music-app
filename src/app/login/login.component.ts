import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import User from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User = {userName: "", password: "", _id: ""}
  warning:string ="";
  loading = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm){
    if(this.user.userName !== "" && this.user.password !==""){
      this.loading = true;
      this.authService.login(this.user)
      .subscribe(res=>{
        this.loading = false;
        localStorage.setItem("access_token", res.token);
        this.router.navigate(["/newReleases"]);
      }, err=>{
        this.warning = err.error.message;
        this.loading = false;
      })
    }
  }

}
