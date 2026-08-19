export type CurrencyCode = 'PKR' | 'USD' | 'AED' | 'EUR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // multiplier from PKR base
  label: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  PKR: { code: 'PKR', symbol: 'Rs ', rate: 1, label: 'PKR (Rs)' },
  USD: { code: 'USD', symbol: '$', rate: 0.00357, label: 'USD ($)' },
  AED: { code: 'AED', symbol: 'AED ', rate: 0.01316, label: 'AED' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.00333, label: 'EUR (€)' },
};

export function formatPrice(pkrAmount: number, currency: CurrencyCode = 'PKR'): string {
  const config = CURRENCIES[currency] || CURRENCIES.PKR;
  if (currency === 'PKR') {
    return `${config.symbol}${Math.round(pkrAmount).toLocaleString()}/-`;
  } else if (currency === 'USD' || currency === 'EUR') {
    const val = (pkrAmount * config.rate).toFixed(2);
    return `${config.symbol}${val}`;
  } else {
    const val = Math.round(pkrAmount * config.rate).toLocaleString();
    return `${config.symbol}${val}`;
  }
}
