import { useState, useEffect } from 'react';
import { getFxRates } from '../services/getFxRates';
import { REFRESH_TIME } from '../constants';
import { Rates } from '../common/types';

export const useRatesFetcher = (): [Rates , boolean] => {
  const [loading, setLoading] = useState(true);
  const [rates, setRates] = useState({});

  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;

    const start = () => {
      getFxRates().then(res => {
        if (typeof res !== 'string') {
          setLoading(false);
          setRates(res);
        }

        id = setTimeout(start, 10000000);
      })
    }

    start();

    return () => clearTimeout(id);
  }, []);

  return [rates, loading];
}