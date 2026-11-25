import { FAIR_PRICE_RATES } from '../data/rateCardData';

export function formatINR(amount) {
  if (amount === undefined || amount === null) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function checkFairPriceStatus(category, price) {
  const standard = FAIR_PRICE_RATES.find(r => r.category === category);
  if (!standard) return { status: 'custom', message: 'Custom Scope' };

  const numPrice = Number(price);
  if (numPrice < standard.minPrice) {
    return {
      status: 'below',
      message: `Below benchmark (₹${standard.minPrice}–₹${standard.maxPrice})`,
      tip: `Standard rate is ₹${standard.minPrice}–₹${standard.maxPrice}. Ensure creator is fairly compensated!`
    };
  } else if (numPrice > standard.maxPrice) {
    return {
      status: 'above',
      message: `Above benchmark (₹${standard.minPrice}–₹${standard.maxPrice})`,
      tip: `Slightly above standard campus bracket; justifiable for rush timelines or advanced stacks.`
    };
  } else {
    return {
      status: 'fair',
      message: `Fair-Price Verified (₹${standard.minPrice}–₹${standard.maxPrice})`,
      tip: `Perfect! Aligns with LPU campus rate card.`
    };
  }
}
