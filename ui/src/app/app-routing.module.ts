import { ProjectListComponent } from './projects/project-list.components';
import { RegistrationComponent } from './registration/registration.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectDetailsComponent } from './projects/project-details.components';

const routes: Routes = [
  { path: 'projects/:id', component: ProjectDetailsComponent },
  {
    path: 'projects',
    component: ProjectListComponent,
    data: { title: 'Projects' }
  },
  {
    path: 'register',
    component: RegistrationComponent,
  },
  { path: '',
    redirectTo: '/projects',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/projects' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
