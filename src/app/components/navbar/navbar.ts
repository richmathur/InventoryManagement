import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal, Signal, WritableSignal, effect, computed } from '@angular/core';
import { Auth } from '../../services/auth';
import { User } from '../../model/user.model';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule, MenubarModule, ButtonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private router = inject(Router);
  private authService = inject(Auth);
  private platformId = inject(PLATFORM_ID);
  items: MenuItem[] | undefined;
 userName = computed(() => this.authService.currentUser()?.username || 'user');
  userRole = computed(() => this.authService.currentUser()?.role || 'Staff');
  ngOnInit() {
  
   this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        command: () => this.router.navigate(['/dashboard']),
      },
      {
        label: 'Inventory',
        icon: 'pi pi-box',
        items: [
          {
            label: 'View Assets',
            icon: 'pi pi-list',
            command: () => this.router.navigate(['/assets-list']),
            visible: this.userRole() === 'admin',
          },
          {
            label: 'Add Asset',
            icon: 'pi pi-plus',
            command: () => this.router.navigate(['/assets']),
            visible: this.userRole() === 'admin',
          },
        ],
      },
    ];
  }
  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}
