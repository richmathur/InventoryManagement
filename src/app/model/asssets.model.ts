export interface Asset {
  assetId: number;
  assetName: string;
  serialNumber: string;
  category?: {
    categoryId: number;
  };
  employee?: {
    fullName: string;
      employeeId: number;
  };
  status: string;
  purchaseDate: string;
  price: number;
}