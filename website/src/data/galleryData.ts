export interface GalleryImage {
  src: string;
  alt: string;
  objectPosition?: string; // CSS object-position value (e.g., "center bottom", "center 70%", "30% center")
  scale?: number; // Scale multiplier (e.g., 1.5 for 150% zoom)
}

export interface GalleryCategory {
  id: string;
  title: string;
  images: GalleryImage[];
}

const baseUrl = import.meta.env.BASE_URL;

export const galleryCategories: GalleryCategory[] = [
  {
    id: 'coffee-fvc',
    title: 'Coffee / FVC',
    images: [
      // Grid layout: Row1=[01(2x2), 02, 07] Row2=[01(cont), 04, 03(1x2)] Row3=[06, 05(2x1), 03(cont)]
      { src: `${baseUrl}gallery/coffee-fvc-01.jpg`, alt: 'FVC coffee beans displayed in premium packaging' },
      { src: `${baseUrl}gallery/coffee-fvc-02.jpg`, alt: 'Close-up of FVC coffee brewing equipment' },
      { src: `${baseUrl}gallery/coffee-fvc-07.jpg`, alt: 'FVC coffee shop interior atmosphere shot' },
      { src: `${baseUrl}gallery/coffee-fvc-04.jpg`, alt: 'FVC coffee roasting process documentation' },
      { src: `${baseUrl}gallery/coffee-fvc-03.jpg`, alt: 'FVC coffee cup with latte art presentation' },
      { src: `${baseUrl}gallery/coffee-fvc-06.jpg`, alt: 'FVC coffee tasting setup with multiple cups' },
      { src: `${baseUrl}gallery/coffee-fvc-05.jpg`, alt: 'FVC branded coffee products arrangement' },
    ],
  },
  {
    id: 'wine-saltriver',
    title: 'Wine / Salt River',
    images: [
      // Grid layout: Row1=[01(2x2), 02, 03] Row2=[01(cont), 06, 04(1x2)] Row3=[05, 07(2x1), 04(cont)]
      { src: `${baseUrl}gallery/wine-saltriver-01.jpg`, alt: 'Salt River wine bottle photography with vineyard backdrop' },
      { src: `${baseUrl}gallery/wine-saltriver-02.jpg`, alt: 'Salt River wine tasting glasses arrangement' },
      { src: `${baseUrl}gallery/wine-saltriver-03.jpg`, alt: 'Salt River wine label detail and branding' },
      { src: `${baseUrl}gallery/wine-saltriver-06.jpg`, alt: 'Salt River wine cellar interior documentation', objectPosition: 'center 40%' },
      { src: `${baseUrl}gallery/wine-saltriver-04.jpg`, alt: 'Salt River vineyard landscape photography' },
      { src: `${baseUrl}gallery/wine-saltriver-05.jpg`, alt: 'Salt River wine pouring action shot', objectPosition: 'center 80%' },
      { src: `${baseUrl}gallery/wine-saltriver-07.jpg`, alt: 'Salt River wine collection product display', objectPosition: 'center 80%' },
    ],
  },
  {
    id: 'menu-wellington',
    title: 'Menu / Wellington',
    images: [
      // Grid layout: Row1=[01(2x2), 02, 03] Row2=[01(cont), 06, 05(1x2)] Row3=[04, 07(2x1), 05(cont)]
      { src: `${baseUrl}gallery/menu-wellington-01.jpg`, alt: 'Wellington menu design cover page layout' },
      { src: `${baseUrl}gallery/menu-wellington-02.jpg`, alt: 'Wellington menu appetizer section photography', objectPosition: 'center 70%' },
      { src: `${baseUrl}gallery/menu-wellington-03.jpg`, alt: 'Wellington menu main course presentation' },
      { src: `${baseUrl}gallery/menu-wellington-06.jpg`, alt: 'Wellington menu typography and design details', objectPosition: 'center 20%' },
      { src: `${baseUrl}gallery/menu-wellington-05.jpg`, alt: 'Wellington menu beverage options display' },
      { src: `${baseUrl}gallery/menu-wellington-04.jpg`, alt: 'Wellington menu dessert spread styling', objectPosition: 'center 90%' },
      { src: `${baseUrl}gallery/menu-wellington-07.jpg`, alt: 'Wellington menu complete spread overview' },
    ],
  },
  {
    id: 'coffee-kz',
    title: 'Coffee / KZ',
    images: [
      // Grid layout: Row1=[01(2x2), 07, 03] Row2=[01(cont), 04, 05(1x2)] Row3=[06, 02(2x1), 05(cont)]
      { src: `${baseUrl}gallery/coffee-kz-01.jpg`, alt: 'KZ coffee beans fresh roast presentation' },
      { src: `${baseUrl}gallery/coffee-kz-07.jpg`, alt: 'KZ coffee product lineup display', objectPosition: 'center 20%' },
      { src: `${baseUrl}gallery/coffee-kz-03.jpg`, alt: 'KZ coffee cup with artistic foam design', objectPosition: 'center 100%' },
      { src: `${baseUrl}gallery/coffee-kz-04.jpg`, alt: 'KZ coffee packaging and branding materials', scale: 1.5 },
      { src: `${baseUrl}gallery/coffee-kz-05.jpg`, alt: 'KZ coffee shop ambiance and seating area', objectPosition: '70% center' },
      { src: `${baseUrl}gallery/coffee-kz-06.jpg`, alt: 'KZ coffee barista preparation process', scale: 2.0 },
      { src: `${baseUrl}gallery/coffee-kz-02.jpg`, alt: 'KZ coffee brewing method demonstration' },
    ],
  },
];
