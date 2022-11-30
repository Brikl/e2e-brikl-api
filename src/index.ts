import * as NBEQuery from './graphqlSource/new-backend/query.json';
import * as OBEQuery from './graphqlSource/old-backend/query.json';
import * as SFQueryy from './graphqlSource/storefront/query.json';
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config();

export default class BriklGraphQL {
  readonly shopID: string;
  protected apiToken: null | string;
  readonly obeDevEndpoint: string;
  readonly nbeDevEndpoint: string;
  readonly nbeProdEndPoint: string;
  readonly storeFrontEndPoint: string;
  readonly authEndPoint: string;
  constructor(shopid: string) {
    this.shopID = shopid;
    this.apiToken = null;
    this.obeDevEndpoint = 'https://dev.api.mybrikl.com/graphql';
    this.nbeDevEndpoint = 'https://dev.internal-api.brikl.com/v1/graphql';
    this.storeFrontEndPoint = 'https://dev.internal-api.brikl.com/graphql/storefront/internal';
    this.authEndPoint = 'https://dev.auth.brikl.com/oauth/token';
  }

  async getDashboardToken(): Promise<BriklGraphQL> {
    const rsp = await fetch(this.authEndPoint, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'password',
        username: `${process.env.DASHBOARD_AUTH_USERNAME}`,
        password: `${process.env.DASHBOARD_AUTH_PASSWORD}`,
        audience: 'https://dev.api.brikl.com',
        client_id: `${process.env.CLIENT_ID}`,
        client_secret: `${process.env.CLIENT_SECRET}`,
      }),
    });
    const data: any = await rsp.json();
    this.apiToken = `Bearer ${data.access_token}`;
    return this;
  }

  async baseRequestGraphQl(apiEndPoint: string, operationName: string, query: string, variables?: {}) {
    if (!this.apiToken) {
      await this.getDashboardToken();
    }
    const response = await fetch(apiEndPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-brikl-shop-id': this.shopID,
        Authorization: this.apiToken,
      },
      body: JSON.stringify({
        operationName,
        query,
        variables,
      }),
    });
    return await response.json();
  }

  /**
   * @remarks
   * This method is calling API to https://dev.internal-api.brikl.com/v1/graphql
   */
  async requestGrapQLNBE(operationName: string, variables?: {}) {
    return await this.baseRequestGraphQl(this.nbeDevEndpoint, operationName, NBEQuery[operationName], variables);
  }

  /**
   * @remarks
   * This method is calling API to https://dev.api.mybrikl.com/graphql
   */
  async requestGrapQLOBE(operationName: string, variables?: {}) {
    return await this.baseRequestGraphQl(this.obeDevEndpoint, operationName, OBEQuery[operationName], variables);
  }

  /**
   * @remarks
   * This method is calling API to https://dev.internal-api.brikl.com/graphql/storefront/internal
   */
  async requestGrapQLSF(operationName: string, variables?: {}) {
    return await this.baseRequestGraphQl(this.storeFrontEndPoint, operationName, SFQueryy[operationName], variables);
  }
}
