export interface Asset {
  assetID: number;
  assetName: string;
  serialNumber: string;
  category?: {
    categoryName: string;
  };
  employee?: {
    fullName: string;
  };
  status: string;
  purchaseDate: string;
  price: number;
}