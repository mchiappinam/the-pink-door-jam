import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from './../../../services/api.service'
import { AuthService } from './../../../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogin: boolean = false
  user: String = null;

  errorMessage
  constructor(
    public _api: ApiService,
    public _auth: AuthService,
    public _router: Router
  ) { }

  ngOnInit() {

    this.isUserLogin();

  }



  onSubmit(form: NgForm) {
    //console.log('Your form data : ', form.value);

    this._api.postTypeRequest('user/login', form.value).subscribe((res: any) => {
      if (res.status) {
        //console.log(res)
        this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
        this._auth.setDataInLocalStorage('token', res.token);
        this._router.navigate(['']);
        this.isUserLogin();
      } else {
        alert(res.error);
      }
    }, err => {
      this.errorMessage = err['error'].message;
    });
  }

  isUserLogin() {
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
      this.user = JSON.parse(JSON.stringify(this._auth.getUserDetails()))[0].username;
    } else {
      this.isLogin = false;
      this.user = null;
    }
  }

  logout() {
    this._auth.clearStorage()
    this._router.navigate(['']);
    this.isUserLogin();
  }
}
