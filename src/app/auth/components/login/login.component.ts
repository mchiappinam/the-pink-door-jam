import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ApiService } from './../../../services/api.service'
import { AuthService } from './../../../services/auth.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogin: boolean = false
  adminLvl: number = 0; //0=user, 1=editor, 2=administrator. (more to add in the future)
  user: String = "Not logged";

  errorMessage
  constructor(
    public _api: ApiService,
    public _auth: AuthService,
    public _router: Router,
    public route: ActivatedRoute,
    public formBuilder: FormBuilder
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
      if (JSON.parse(JSON.stringify(this._auth.getUserDetails()))[0].admin != 0) {
        switch (JSON.parse(JSON.stringify(this._auth.getUserDetails()))[0].admin) {
          case 0:
            this.adminLvl = 0;
            break;
          case 1:
            this.adminLvl = 1;
            break;
          case 2:
            this.adminLvl = 2;
            break;
        }
      }
      this.user = JSON.parse(JSON.stringify(this._auth.getUserDetails()))[0].username;
    } else {
      this.isLogin = false;
      this.adminLvl = 0;
      this.user = "Not logged";
    }
  }

  logout() {
    this._auth.clearStorage()
    this._router.navigate(['']);
    this.isUserLogin();
  }
}
