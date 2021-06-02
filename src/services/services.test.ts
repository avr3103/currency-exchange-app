import { getFxRates } from './getFxRates';
import { API_URL } from '../constants';

describe('FX Rates API', () => {
  it("sends ger rates request", async () => {

    const mockData = {USD: 1, EUR: 1.21, GBP: 1.40};

    jest.spyOn(global, 'fetch').mockImplementation((): Promise<any> =>
        Promise.resolve({
          json: () => Promise.resolve(mockData),
        })
    );

    await getFxRates();

    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining(API_URL), {"method": "GET"})
  });
});