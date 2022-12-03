import { BriklGraphQL } from '../index';

const nbeShopId = '3ddd1f77-23b5-4bc7-9059-c32cc1338723';
const apiInstant = new BriklGraphQL(nbeShopId);

test('verify ability to request NBE', async () => {
  const productNBEResponse = await apiInstant.requestGrapQLNBE('dashboardGetProductsNB', {
    filter: {
      status: 'ACTIVE',
      types: ['CUSTOM', 'DIGITAL', 'STOCK'],
    },
    first: 20,
  });
  expect(productNBEResponse).toHaveProperty('data');
  expect(productNBEResponse.data).toHaveProperty('products');
});

test('verify ability to request OBE', async () => {
  const OBEResponse = await apiInstant.requestGrapQLOBE('getShop', {
    shopId: nbeShopId,
  });
  expect(OBEResponse).toHaveProperty('data');
  expect(OBEResponse.data).toHaveProperty('shop');
  expect(OBEResponse.data).toHaveProperty('adminUser');
});

test('verify ability to request SF', async () => {
  const SFResponse = await apiInstant.requestGrapQLSF('cartItemsCountSF', {
    id: '798fcc49-f920-47d7-b36b-74f4739d0d03',
  });
  console.log(SFResponse);
  expect(SFResponse).toHaveProperty('data');
  expect(SFResponse.data).toHaveProperty('cartItemsCount');
});
