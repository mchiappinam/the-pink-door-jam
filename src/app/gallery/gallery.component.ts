import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginComponent } from '../auth/components/login/login.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent extends LoginComponent implements OnInit {
  pics: any[] = null;
  imageGroups: any[];
  validatingForm: FormGroup;

  ngOnInit() {


    this.isUserLogin();


    this.validatingForm = new FormGroup({
      modalEditFormTitle: new FormControl('', Validators.required),
      modalEditFormDescription: new FormControl('', Validators.required)
    })
    this.loadPics();
  }

  loadPics() {
    this._api.getTypeRequest('user/loadpics').subscribe((res: any) => {
      if (res.status) {
        //console.log(res)
        //console.log(JSON.stringify(res.data));
        this.pics = res.data;
        this.imageGroups = this.pics.reduce((p, c, i) => {
          if (i === 0 || i % 3 === 0) {
            p.push([c]);
          } else {
            p[p.length - 1].push(c);
          }
          return p;
        }, []);
      } else {
        alert(res.error);
      }
    }, err => {
      this.errorMessage = err['error'].message;
    });
  }

  getLikeCount(liked: string) {
    if (liked == null) {
      return 0;
    }
    var lkd: string[] = null;
    lkd = liked.split(',');
    return lkd.length;
  }

  isLikedByUser(uid: number, like_user_id: string) {
    if ((like_user_id == null) || (uid == 0) || (uid == null)) {
      return false;
    }
    var lkd: number[] = null;
    lkd = like_user_id.split(',').map(Number);
    if (lkd.includes(uid)) {
      return true;
    }
    return false;
  }

  likeToggle(p_id: any) {

    const data = { uid: this.userId, post_id: p_id }
    this._api.putTypeRequest('user/likes', data).subscribe((res: any) => {

      if (res.status == 1) {
        this.loadPics();
      } else {
        alert(JSON.stringify(res))
      }
    }, err => {
      alert("Error: API not implemented");
      this.errorMessage = err['error'].message;
    });
  }


}
