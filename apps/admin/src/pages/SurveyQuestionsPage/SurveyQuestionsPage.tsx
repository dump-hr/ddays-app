import { useFetchSurveyQuestions } from '../../api/SurveyQuestions/useFetchSurveyQuestions';
import Table from '../../components/Table';

const SurveyQuestionsPage = () => {
  const headers = [
    'Broj',
    'Pitanje',
    'Opis',
    'Label',
    'Tip',
    'Vrsta polja za unos',
    'Akcije',
  ];

  const { data: surveyQuestions, isLoading } = useFetchSurveyQuestions();

  const buttonActions = [
    {
      label: 'Uredi',
      action: (row: object) =>
        console.log('Edit survey question with id: ', row),
    },
    {
      label: 'Obriši',
      action: (row: object) =>
        console.log('Delete survey question with id: ', row),
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Table
        headers={headers}
        data={surveyQuestions}
        buttonActions={buttonActions}
      />
    </>
  );
};

export default SurveyQuestionsPage;
