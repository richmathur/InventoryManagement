import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableModule, Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Asset } from '../../app/model/asssets.model';
import { AssetsService } from '../../app/services/assets.service';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    TableModule, 
    ButtonModule, 
    DialogModule, 
    InputTextModule,
    TagModule
  ],
  templateUrl: './assets.html',
  styleUrl: './assets.scss',
})
export class Assets {
assets = signal<Asset[]>([]);
loading = signal<boolean>(true);

  displayModal = signal<boolean>(false); // Controls modal visibility
  assetForm = new FormGroup({
    assetName: new FormControl('', [Validators.required]),
    serialNumber: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.min(1)])
  });
 constructor(private assetService: AssetsService) {} 
ngOnInit() {
    this.loadAssets();
  }
  loadAssets() {
    this.assetService.getAssets().subscribe(data => this.assets.set(data));
  }
  showDialog() {
    this.assetForm.reset();
    this.displayModal.set(true);
  }
  // Add these to your AssetComponent class
getStatusCount(status: string): number {
  return this.assets().filter(a => a.status === status).length;
}
  saveAsset() {
    if (this.assetForm.valid) {
      const newAsset = this.assetForm.value as Asset;
      this.assetService.createAsset(newAsset).subscribe(() => {
        const newAsset = this.assetForm.value as Asset;
        this.loadAssets(); // Refresh table
        this.displayModal.set(false); // Close modal
      });
    }
    
  }
  // Helper for PrimeNG Tag colors
  getSeverity(status: string) {
    switch (status?.toLowerCase()) {
      case 'available': return 'success';
      case 'assigned': return 'info';
      case 'maintenance': return 'danger';
      default: return 'secondary';
    }
    
}
}
