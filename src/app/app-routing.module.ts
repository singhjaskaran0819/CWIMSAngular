import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainModule } from './modules/main/main.module';
import { AuthModule } from './modules/auth/auth.module';
import { ExternalAuthguardService } from './core/guards/externalGuard';

const routes: Routes = [

  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  //module routes
  { path: 'auth', canActivate: [ExternalAuthguardService], loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'main', loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule) },

  // not-found route
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ExternalAuthguardService]
})
export class AppRoutingModule { }
