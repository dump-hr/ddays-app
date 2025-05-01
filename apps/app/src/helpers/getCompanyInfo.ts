// Izbrisat file ako se nece koristit!

import ProficoLogo from '@/assets/images/Profico.svg';

export function getCompanyName(companyId: number) {
  return `Profico (${companyId})`;
}

export function getCompanyLogo(companyId: number) {
  if (companyId) return ProficoLogo;
  return ProficoLogo;
}
