import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(private router: Router) {
    this.SetupDefaultRoutes();
  }

  private SetupDefaultRoutes(): void {
    this.router.config.unshift(
      {
        path: '**', component: HomeComponent
      }
    )
  }
}

