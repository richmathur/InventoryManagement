import { Component, computed, inject, PLATFORM_ID, signal, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { AssetsService } from '../../app/services/assets.service';
import { Asset } from '../../app/model/asssets.model';
import { AvatarModule } from 'primeng/avatar';
import { Navbar } from '../../app/components/navbar/navbar';
import { Auth } from '../../app/services/auth';
@Component({
  selector: 'app-dashboard',
  imports: [
    CardModule,
    TableModule,
    ChartModule,
    CommonModule,
    DividerModule,
    AvatarModule,
    Navbar,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  options: any;
  data: any;
  platformId = inject(PLATFORM_ID);
  authService = inject(Auth);
  userRole = computed(() => this.authService.currentUser()?.role || 'Staff');
  assets = signal<Asset[]>([]);
  displayUserName = computed(() => this.authService.currentUser()?.username || 'Guest') ;
  loading = signal<boolean>(true);
  //Compute Logic
  TotalAssets = computed(() => this.assets().length);
  InUseAssets = computed(() => this.assets().filter((a) => a.status === 'Assigned').length);
  InRepairAssets = computed(() => this.assets().filter((a) => a.status === 'Maintenance').length);
  AvailableAssets = computed(() => this.assets().filter((a) => a.status === 'Available').length);

  constructor(private router: Router, private assetService: AssetsService) {}

  ngOnInit() {
    console.log('Dashboard initialized for user:', this.displayUserName(), 'with role:', this.userRole()  ,'currentUser:', this.authService.currentUser() );
    // Get the name we saved in Login
    this.loadAssets();
  }


  goToAssetList() {
    this.router.navigate(['/asset-list']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  loadAssets() {
    this.assetService.getAssets().subscribe((data) => {
      setTimeout(() => {
        this.assets.set(data);
        this.loading.set(false);
      }, 0);
    });
  }
}
