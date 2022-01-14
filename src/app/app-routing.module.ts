import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageEditComponent } from './image-edit/image-edit.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'upload', component: UploadComponent},
	{path: 'edit/:id' , component: ImageEditComponent},
  {path: '', component: GalleryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }