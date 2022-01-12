import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../auth/components/login/login.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent extends LoginComponent implements OnInit {
  pics: any[] = null;
  imageGroups: any[][];

  ngOnInit() {


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


}
