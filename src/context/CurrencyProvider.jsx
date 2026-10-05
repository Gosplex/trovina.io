import React, { createContext, useContext, useMemo, useState } from 'react';
import { CURRENCIES, formatPrice } from '../constants/pricing';

const CurrencyContext = createContext({ currency: 'NGN', setCurrency: () => {}, format: (n) => n });
const STORAGE_KEY = 'trovina-currency';

/** Visitors on Nigerian time see Naira by default; everyone else sees USD. */
function detectCurrency() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && CURRENCIES[stored]) return stored;
  } catch {
    /* storage unavailable */
  }
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    return tz === 'Africa/Lagos' ? 'NGN' : 'USD';
  } catch {
    return 'NGN';
  }
}

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState(detectCurrency);

  const value = useMemo(
    () => ({
      currency,
      setCurrency: (code) => {
        setCurrencyState(code);
        try {
          localStorage.setItem(STORAGE_KEY, code);
        } catch {
          /* ignore */
        }
      },
      /** format({ NGN, USD }) or format(number) in the active currency */
      format: (amount) =>
        formatPrice(typeof amount === 'object' ? amount[currency] : amount, currency),
    }),
    [currency],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCurrency = () => useContext(CurrencyContext);

export function CurrencyToggle({ className = '' }) {
  const { currency, setCurrency } = useCurrency();
  return (
    <div
      role="radiogroup"
      aria-label="Show prices in"
      className={`inline-flex rounded-full border border-border bg-surface p-1 text-sm ${className}`}
    >
      {Object.values(CURRENCIES).map((c) => (
        <button
          key={c.code}
          type="button"
          role="radio"
          aria-checked={currency === c.code}
          onClick={() => setCurrency(c.code)}
          className={`rounded-full px-4 py-1.5 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            currency === c.code ? 'bg-foreground text-background' : 'text-muted hover:text-foreground'
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
