import { useFetchAllCompanies } from '../../api/useFetchAllCompanies';

const CompaniesPage = () => {
  const { data: companies, isLoading } = useFetchAllCompanies();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {companies?.map((company, i) => (
        <div key={i}>
          <h2>{company.name}</h2>
          <p>{company.description}</p>
          <p>{company.boothLocation}</p>
          <p>{company.codeId}</p>
          <p>
            <a href={company.websiteUrl}>{company.websiteUrl}</a>
          </p>
          <span>{company.sponsorCategory}</span>
        </div>
      ))}
    </div>
  );
};

export default CompaniesPage;
