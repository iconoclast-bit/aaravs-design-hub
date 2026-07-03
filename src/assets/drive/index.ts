import d1 from './d1.jpg.asset.json';
import d3 from './d3.jpg.asset.json';
import d4 from './d4.jpg.asset.json';
import d5 from './d5.jpg.asset.json';
import d6 from './d6.jpg.asset.json';
import d7 from './d7.jpg.asset.json';
import d8 from './d8.jpg.asset.json';
import d9 from './d9.jpg.asset.json';
import d10 from './d10.jpg.asset.json';
import d11 from './d11.jpg.asset.json';
import d12 from './d12.jpg.asset.json';
import d13 from './d13.jpg.asset.json';
import d14 from './d14.jpg.asset.json';
import d19 from './d19.jpg.asset.json';
import d20 from './d20.jpg.asset.json';

// Categorised so pages can pick images matching the copy.
// d18 is the studio logo and intentionally excluded from portfolio grids.
export const drive = {
  d1: d1.url, d3: d3.url, d4: d4.url, d5: d5.url, d6: d6.url,
  d7: d7.url, d8: d8.url, d9: d9.url, d10: d10.url, d11: d11.url,
  d12: d12.url, d13: d13.url, d14: d14.url, d19: d19.url, d20: d20.url,
};

// Residential / living / bedroom / hallway shots
export const residentialImages: string[] = [
  d1.url, d3.url, d4.url, d5.url, d6.url, d13.url, d14.url, d19.url, d20.url,
];

// Office / workstation / display shelf shots
export const commercialImages: string[] = [
  d7.url, d8.url, d9.url, d10.url, d11.url, d12.url,
];

export const driveImages: string[] = [...residentialImages, ...commercialImages];
