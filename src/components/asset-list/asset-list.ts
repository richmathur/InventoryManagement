import { Component, signal } from '@angular/core';
import { Asset } from '../../app/model/asssets.model';
import { AssetsService } from '../../app/services/assets.service';

@Component({
  selector: 'app-asset-list',
  imports: [],
  templateUrl: './asset-list.html',
  styleUrl: './asset-list.scss',
})
export class AssetList {
  assets = signal<Asset[]>([]);
  constructor(private assetService: AssetsService) {} 
  ngOnInit() {
    this.assetService.getAssets().subscribe(data => {
      // Use .set() to update the value
      this.assets.set(data);
    });
  }
}
