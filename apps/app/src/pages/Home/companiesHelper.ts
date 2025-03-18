import { CompanyPublicDto } from '@ddays-app/types';

export async function fetchTopRatedCompanies(): Promise<CompanyPublicDto[] | undefined> {
  try {
    const response = await fetch('/api/company/top-rated');
    if (!response.ok) {
      throw new Error('Failed to fetch top-rated companies');
    }
    const data = await response.json();
    console.log(data);
    return data as CompanyPublicDto[];
  } catch (error) {
    console.error('Error fetching top-rated companies:', error);
  }
}