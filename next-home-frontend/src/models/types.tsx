export type ListingType = {
  _id?: string;
  title: string;
  unitNumber: string;
  project: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: string;
  description: string;
  image: string;
  type: string
};

export interface ActionResponse {
  success: boolean;
  message: string;
  fields?: ListingType;
  errors?: {
    [K in keyof ListingType]?: string[];
  };
}

export function extractListingFromFormData(formData: FormData): ListingType {
  return {
    title: formData.get("title")?.toString() ?? "",
    unitNumber: formData.get("unitNumber")?.toString() ?? "",
    project: formData.get("project")?.toString() ?? "",
    price: formData.get("price")?.toString() ?? "0",
    bedrooms: parseInt(formData.get("bedrooms")?.toString() ?? "0"),
    bathrooms: parseInt(formData.get("bathrooms")?.toString() ?? "0"),
    area: parseFloat(formData.get("area")?.toString() ?? "0"),
    location: formData.get("location")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
    image: "", 
    type: formData.get("type")?.toString() ?? "rent",
  };
}