import { Routes } from '@angular/router';
import { Login } from '../components/login/login';
import { Dashboard } from '../components/dashboard/dashboard';
import { AssetList } from '../components/asset-list/asset-list';
import { Assets  } from '../components/assets/assets';
import { authGuard } from './guards/auth-guard';
import { Navbar } from './components/navbar/navbar';
export const routes: Routes = [
  { path: '', component: Login }, // This replaces your hardcoded <app-login>
  { path: 'dashboard', canActivate: [authGuard], component: Dashboard },
  { path: 'navbar', canActivate: [authGuard], component: Navbar },

  { path: 'assets', component: Assets },
  { path: 'login', component: Login },
  { path: 'asset-list', component: AssetList },
  { path: '**', component: Login },


];
