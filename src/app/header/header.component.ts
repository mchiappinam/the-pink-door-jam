import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../auth/components/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends LoginComponent implements OnInit {



  ngOnInit() {
    this.isUserLogin(); 
    setInterval(()=>{this.isUserLogin()}, 250);
  }

  getName() {
    if(this.isLogin)
      return this._auth.getUserDetails().getName();
    else
      return "Not logged";
  }


}
