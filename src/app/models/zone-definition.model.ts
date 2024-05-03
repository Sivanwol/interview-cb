import {Location} from "./location.model";
export type ZoneDefinition = {
  type: string,
  items: Location[]
}

export type ZonesDefinition = {
  zones: ZoneDefinition,
  sites: ZoneDefinition,
  placesMarks: ZoneDefinition,
  layers: ZoneDefinition,
}
