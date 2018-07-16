import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogin = true;

  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    if(this.authService.isLogin) {
      this.router.navigate(['../dashboard']);
    }
  }

  onLogin(form: NgForm) {
    console.log('login', form);
    this.http.post('http://localhost:4100/api/login', form.value, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
      .subscribe((data: any) => {
        console.log('data', data);
        if(data.data.length > 0) {
          this.authService.isLogin = true;
          this.router.navigate(['../dashboard']);
        }
        else {
          // this.isLogin = false;
          this.authService.isLogin = false;
        }
        
      })
  }

}
