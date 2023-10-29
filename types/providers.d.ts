export interface Providers {
  id: number;
  results: Results;
}

export interface Results {
  AD: Ad;
  AE: AE;
  AL: AE;
  AR: AE;
  AT: AE;
  AU: AE;
  AZ: AE;
  BA: AE;
  BE: AE;
  BG: AE;
  BH: AE;
  BO: Ad;
  BR: Ad;
  CA: AE;
  CH: AE;
  CL: AE;
  CO: AE;
  CR: Ad;
  CV: AE;
  CY: AE;
  CZ: AE;
  DE: AE;
  DK: AE;
  DO: Ad;
  EC: AE;
  EE: AE;
  EG: AE;
  ES: AE;
  FI: AE;
  FJ: AE;
  FR: AE;
  GB: AE;
  GR: AE;
  GT: Ad;
  HK: Ad;
  HN: Ad;
  HR: AE;
  HU: AE;
  ID: Ad;
  IE: AE;
  IL: AE;
  IN: AE;
  IS: AE;
  IT: AE;
  JO: AE;
  JP: AE;
  KR: AE;
  KW: AE;
  LB: AE;
  LI: Ad;
  LT: AE;
  LU: AE;
  LV: AE;
  MD: AE;
  ME: Ad;
  MK: AE;
  MT: AE;
  MU: AE;
  MX: Ad;
  MY: Ad;
  MZ: AE;
  NI: Ad;
  NL: AE;
  NO: AE;
  NZ: AE;
  OM: AE;
  PA: Ad;
  PE: AE;
  PH: Ad;
  PL: AE;
  PT: AE;
  PY: Ad;
  QA: AE;
  RO: Ad;
  RS: AE;
  RU: AE;
  SA: AE;
  SE: AE;
  SG: Ad;
  SI: AE;
  SK: AE;
  SM: Ad;
  SV: Ad;
  TH: Ad;
  TR: AE;
  TW: Ad;
  UA: AE;
  UG: AE;
  US: AE;
  UY: Ad;
  VE: AE;
  ZA: AE;
}

export interface Ad {
  link: string;
  flatrate: Flatrate[];
}

export interface Flatrate {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface AE {
  link: string;
  buy: Flatrate[];
  rent?: Flatrate[];
  flatrate?: Flatrate[];
}
