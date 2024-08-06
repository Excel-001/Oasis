import { faker } from '@faker-js/faker';

const categories = [
  'Sitting Room',
  'Dining Room',
  'Kitchen',
  'Accessories',
  'Bedroom',
  'Home Office',
  'Outdoor'
];

const subsections = [
  'long chair',
  'short chair',
  'bed',
  'foam',
  'lamp',
  "flower pot",
  'room accessories',
  'Office table',
  'coffe table',
  'accent chair',
  'sofa',
];

const generateImages = (numImages) => {
  const images = [];
  for (let i = 0; i < numImages; i++) {
    images.push(faker.image.imageUrl(640, 480, 'furniture', true));
  }
  return images;
};

export const generateFakeProducts = (numProductsPerSubsection) => {
  const products = [];

  categories.forEach(category => {
    subsections.forEach(subsection => {
      for (let i = 0; i < numProductsPerSubsection; i++) {
        const product = {
          id: faker.datatype.uuid(),
          name: faker.commerce.productName("furniture"),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price(),
          category: category,
          subsection: subsection,
          images: generateImages(4),
          rating: faker.datatype.float({ min: 1, max: 5, precision: 0.1 }),
          stock: faker.datatype.number({ min: 0, max: 100 }),
        };

        products.push(product);
      }
    });
  });

  return products;
};
