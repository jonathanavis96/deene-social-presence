export interface GalleryImage {
  src: string;
  alt: string;
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
      { src: `${baseUrl}gallery/coffee-fvc-01.jpg`, alt: 'FVC coffee beans displayed in premium packaging' },
      { src: `${baseUrl}gallery/coffee-fvc-02.jpg`, alt: 'Close-up of FVC coffee brewing equipment' },
      { src: `${baseUrl}gallery/coffee-fvc-03.jpg`, alt: 'FVC coffee cup with latte art presentation' },
      { src: `${baseUrl}gallery/coffee-fvc-04.jpg`, alt: 'FVC coffee roasting process documentation' },
      { src: `${baseUrl}gallery/coffee-fvc-05.jpg`, alt: 'FVC branded coffee products arrangement' },
      { src: `${baseUrl}gallery/coffee-fvc-06.jpg`, alt: 'FVC coffee tasting setup with multiple cups' },
      { src: `${baseUrl}gallery/coffee-fvc-07.jpg`, alt: 'FVC coffee shop interior atmosphere shot' },
    ],
  },
  {
    id: 'wine-saltriver',
    title: 'Wine / Salt River',
    images: [
      { src: `${baseUrl}gallery/wine-saltriver-01.jpg`, alt: 'Salt River wine bottle photography with vineyard backdrop' },
      { src: `${baseUrl}gallery/wine-saltriver-02.jpg`, alt: 'Salt River wine tasting glasses arrangement' },
      { src: `${baseUrl}gallery/wine-saltriver-03.jpg`, alt: 'Salt River wine label detail and branding' },
      { src: `${baseUrl}gallery/wine-saltriver-04.jpg`, alt: 'Salt River vineyard landscape photography' },
      { src: `${baseUrl}gallery/wine-saltriver-05.jpg`, alt: 'Salt River wine pouring action shot' },
      { src: `${baseUrl}gallery/wine-saltriver-06.jpg`, alt: 'Salt River wine cellar interior documentation' },
      { src: `${baseUrl}gallery/wine-saltriver-07.jpg`, alt: 'Salt River wine collection product display' },
    ],
  },
  {
    id: 'menu-wellington',
    title: 'Menu / Wellington',
    images: [
      { src: `${baseUrl}gallery/menu-wellington-01.jpg`, alt: 'Wellington menu design cover page layout' },
      { src: `${baseUrl}gallery/menu-wellington-02.jpg`, alt: 'Wellington menu appetizer section photography' },
      { src: `${baseUrl}gallery/menu-wellington-03.jpg`, alt: 'Wellington menu main course presentation' },
      { src: `${baseUrl}gallery/menu-wellington-04.jpg`, alt: 'Wellington menu dessert spread styling' },
      { src: `${baseUrl}gallery/menu-wellington-05.jpg`, alt: 'Wellington menu beverage options display' },
      { src: `${baseUrl}gallery/menu-wellington-06.jpg`, alt: 'Wellington menu typography and design details' },
      { src: `${baseUrl}gallery/menu-wellington-07.jpg`, alt: 'Wellington menu complete spread overview' },
    ],
  },
  {
    id: 'coffee-kz',
    title: 'Coffee / KZ',
    images: [
      { src: `${baseUrl}gallery/coffee-kz-01.jpg`, alt: 'KZ coffee beans fresh roast presentation' },
      { src: `${baseUrl}gallery/coffee-kz-02.jpg`, alt: 'KZ coffee brewing method demonstration' },
      { src: `${baseUrl}gallery/coffee-kz-03.jpg`, alt: 'KZ coffee cup with artistic foam design' },
      { src: `${baseUrl}gallery/coffee-kz-04.jpg`, alt: 'KZ coffee packaging and branding materials' },
      { src: `${baseUrl}gallery/coffee-kz-05.jpg`, alt: 'KZ coffee shop ambiance and seating area' },
      { src: `${baseUrl}gallery/coffee-kz-06.jpg`, alt: 'KZ coffee barista preparation process' },
      { src: `${baseUrl}gallery/coffee-kz-07.jpg`, alt: 'KZ coffee product lineup display' },
    ],
  },
];
