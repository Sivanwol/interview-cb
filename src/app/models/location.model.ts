import {LocationItem} from "./location-item.model";

export type Location = {
  name: string;
  translationKey: string;
  icon: string;
  items: LocationItem[]
}
