import {
  ElectronicsSubCategory,
  MobileSubCategory,
  VehicleSubCategory,
  FurnitureSubCategory,
  FashionSubCategory,
  HomeAppliancesSubCategory,
  BookSubCategory,
  SportsSubCategory,
  OtherSubCategory,
} from "./enum";

export const CategorySubCategoryMap: Record<string, string[]> = {
  electronics: Object.values(ElectronicsSubCategory),
  mobiles: Object.values(MobileSubCategory),
  vehicles: Object.values(VehicleSubCategory),
  furniture: Object.values(FurnitureSubCategory),
  fashion: Object.values(FashionSubCategory),
  home_appliances: Object.values(HomeAppliancesSubCategory),
  books: Object.values(BookSubCategory),
  sports: Object.values(SportsSubCategory),
  other: Object.values(OtherSubCategory),
};
