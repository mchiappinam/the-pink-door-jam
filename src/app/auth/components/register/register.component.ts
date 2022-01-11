import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends LoginComponent implements OnInit {
  errorMessage

  ngOnInit() {

    this.isUserLogin();

  }



  onSubmit(form: NgForm) {
    //console.log('Your form data : ', form.value);

    this._api.postTypeRequest('user/register', form.value).subscribe((res: any) => {
      if (res.status == 1) {
        this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
        this._auth.setDataInLocalStorage('token', res.token);
        this._router.navigate(['login']);
        this.isUserLogin();
      } else if (res.status == 2) {
        alert(res.error);
        this._router.navigate(['login']);
      } else {
        alert(res.error)
      }
    }, err => {
      this.errorMessage = err['error'].message;
    });
  }

}