import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../auth/components/login/login.component';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.scss']
})
export class ImageEditComponent extends LoginComponent implements OnInit {
  pic: any = null;
  ngOnInit() {
    this.isUserLogin();
    if (!this.isLogin) {
      alert("You're not logged!");
      this._router.navigate(['login']);
      return;
    } else if (this.adminLvl == 0) {
      alert("Your account doesn't have permission to access that!");
      this._router.navigate(['']);
      return;
    }

    //enabled: 0=false, 1=forAll, 2=staffOnly
    this.route.params.subscribe(params => {
      this._api.getTypeRequest('user/loadpic' + params.id).subscribe((res: any) => {
        if (res.status) {
          //console.log(res.data)
          //console.log(JSON.stringify(res.data));
          this.pic = res.data[0];
        } else {
          alert(JSON.stringify(res.error));
        }
      }, err => {
        this.errorMessage = err['error'].message;
      });
    });
  }

}
