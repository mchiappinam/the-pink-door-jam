import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from '../auth/components/login/login.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent extends LoginComponent implements OnInit {

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;

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


    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: ['']
    });
  }


  onFileSelect(event) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    this.fileUploadForm.get('uploadedImage').setValue(file);
  }


  onUploadSubmit() {

    if (this.adminLvl == 0)
      return;

    if (!this.fileUploadForm.get('uploadedImage').value) {
      alert('Please select a image to upload!');
      return false;
    }

    const formData = new FormData();
    formData.append('uploadedImage', this.fileUploadForm.get('uploadedImage').value);
    formData.append('agentId', '007');






    this._api.postTypeRequest('user/upload', formData).subscribe(response => {
      if (JSON.parse(JSON.stringify(response)).statusCode === 200) {
        alert("Image uploaded successfully!");
        this.uploadFileInput.nativeElement.value = "";
        this.fileInputLabel = undefined;
      }
    }, er => {
      console.log(er);
      alert(er.error.error);
    });
  }


}
