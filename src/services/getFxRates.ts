import { API_URL, API_KEY } from '../constants';
import { Rates } from '../common/types';

export const getFxRates = async (): Promise<Rates | string> => {
  try {
    const res = await fetch(`${API_URL}/latest.json?app_id=${API_KEY}`,
      {method: 'GET'});

    const data = await res.json();

    return data.rates;
  } catch (e) {
    return `error: ${e.message}`;
  }
}