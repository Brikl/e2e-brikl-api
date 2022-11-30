# E2E brikl API

facilitate request sending for Brikl Playwright's E2E

## Prerequisite to install this package

1. this package version is only applicable to E2E playwright repo

2. Must have following environment variables setup in playwright repository

```
DASHBOARD_AUTH_USERNAME=...
DASHBOARD_AUTH_PASSWORD=...
CLIENT_ID=...
CLIENT_SECRET=...
```

---

## How to use package

1. install package with pnpm or npm

```
npm install e2e-brikl-api

or

pnpm install e2e-brikl-api
```

2. initiale instant and call functions with operation name

```
const apiInstant = new BriklGraphQL(nbeShopId);

// call NBE
const NBEResponse = await apiInstant.requestGrapQLNBE('dashboardGetProductsNB', {filter})

// call OBE
 const OBEResponse = await apiInstant.requestGrapQLOBE('getShop', {shopId});


// call SF
 const SFResponse = await apiInstant.requestGrapQLSF('cartItemsCountSF', {id})
```
