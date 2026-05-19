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
import { SelectModule } from 'primeng/select';
import { CategoryService } from '../../app/services/category.service';
import { Category } from '../../app/model/category.model';
import { Employee } from '../../app/model/employee.model';
import { EmployeeService } from '../../app/services/employee-service';
import { Navbar } from "../../app/components/navbar/navbar";


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
    TagModule,
    SelectModule,
    Navbar
  ],
  templateUrl: './assets.html',
  styleUrl: './assets.scss',
})
export class Assets {
  assets = signal<Asset[]>([]);
  categories = signal<Category[]>([]);
  employees = signal<Employee[]>([]);
  serialNumber = signal<string>(''); // New signal for serial number
  displayModal = signal<boolean>(false); // Controls modal visibility
  selectedAssetID = signal<number | null>(null); // Holds the asset id being edited
  loading = signal<boolean>(true);
  statusOptions = [
    { label: 'Available', value: 'Available' },
    { label: 'Assigned', value: 'Assigned' },
    { label: 'Maintenance', value: 'Maintenance' },
  ];
  assetForm = new FormGroup({
    assetName: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.min(1)]),
    status: new FormControl('', [Validators.required]),
    assignTo: new FormControl<number | null>(null),
    categoryId: new FormControl<number | null>(null, [Validators.required]),
    employeeId: new FormControl<number | null>(null),
    serialNumber: new FormControl('', [Validators.required]),
  });
  constructor(
    private assetService: AssetsService,
    private categoryService: CategoryService,
    private employeeService: EmployeeService
  ) {}
  ngOnInit() {
    debugger
    this.loadAssets();
  }
  loadAssets() {
    this.assetService.getAssets().subscribe((data) => {
      this.assets.set(data);
    });
    this.loading.set(false);
  }
  getCategoryName() {
    this.categoryService.getCategory().subscribe((data) => {
      this.categories.set(data);
    });
  }
  getEmployee() {
    this.employeeService.getEmployee().subscribe((data) => {
      this.employees.set(data);
    });
  }
  showDialog(action: string, asset?: Asset) {
    if (action == 'add') {
       // Enable the control so the user can add the Unique Serial Number
      this.assetForm.get('serialNumber')?.enable();
      this.getCategoryName();
      this.getEmployee();
      this.selectedAssetID.set(null);
      this.assetForm.reset();
      this.displayModal.set(true);
      0;
    } else if (action == 'edit' && asset) {
     
      // Disable the control so the user cannot change the Unique Serial Number
      this.assetForm.get('serialNumber')?.disable();
      this.getCategoryName();
      this.getEmployee();
      this.displayModal.set(true);
      this.serialNumber.set(asset.serialNumber); // Set the serial number signal
      this.selectedAssetID.set(asset.assetId);
      this.assetForm.patchValue({
        assetName: asset.assetName,
        price: asset.price,
        status: asset.status,
        assignTo: asset.employee?.employeeId || null,
        categoryId: asset.category?.categoryId ?? null,
        employeeId: asset.employee?.employeeId ?? null,
        serialNumber: asset.serialNumber, // Patch the serial number to the form
      });
    }
  }
  // Add these to your AssetComponent class
  getStatusCount(status: string): number {
    return this.assets().filter((a) => a.status === status).length;
  }

  saveAsset() {
    debugger;
    if (this.assetForm.valid) {
      debugger;
      const newAsset = this.assetForm.value as Asset;
      this.assetService.createAsset(newAsset).subscribe(() => {
        const newAsset = this.assetForm.value as Asset;
        this.loadAssets(); // Refresh table
        this.displayModal.set(false); // Close modal
      });
    }
  }
  onSubmit() {
    if (this.assetForm.invalid) return;

    // Check if we have a selected ID. If yes, we are UPDATING. If no, we are ADDING.
    const currentId = this.selectedAssetID();

    if (currentId) {
      this.updateAsset(); //  update logic
    } else {
      this.saveAsset(); //  create logic
    }
  }
  updateAsset() {
    const currentId = this.selectedAssetID();
    if (this.assetForm.valid && currentId) {
      // Create the payload by combining the form values with the ID
      const updatedAsset: Asset = {
        ...this.assetForm.value,
        assetId: currentId,
        serialNumber: this.serialNumber(),
      } as Asset;
      this.assetService.updateAsset(currentId, updatedAsset).subscribe(() => {
        this.loadAssets(); // Refresh table after update
        this.displayModal.set(false); // Close modal
      });
    }
  }
  // Helper for PrimeNG Tag colors
  getSeverity(status: string) {
    switch (status?.toLowerCase()) {
      case 'available':
        return 'success';
      case 'assigned':
        return 'info';
      case 'maintenance':
        return 'danger';
      default:
        return 'secondary';
    }
  }
}
