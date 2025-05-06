import { UserToCompanyDto } from '@ddays-app/types/src/dto/user';

import CheckIcon from '../../../assets/icons/check.svg';
import QuestionIcon from '../../../assets/icons/question.svg';
import XIcon from '../../../assets/icons/x.svg';
import WhiteButton from '../../../components/WhiteButton';
import c from '../FlyTalksPage.module.scss';

type TableRowProps = {
  applicant: UserToCompanyDto;
  handleOpenModal: (user: UserToCompanyDto) => void;
  status: 'accepted' | 'rejected';
  timeLeft?: Date;
  //cvHref: string;
  //buttonHandler: () => void;
};

const TableRow: React.FC<TableRowProps> = ({
  applicant,
  handleOpenModal,
  status,
  timeLeft,
}) => {
  function getStatusIcon(): string {
    if (!timeLeft) return QuestionIcon;

    const isAccepted = true; // iz baze
    if (timeLeft.getTime() !== 0) {
      return QuestionIcon;
    } else if (isAccepted) {
      return CheckIcon;
    } else {
      return XIcon;
    }
  }
  return (
    <tr>
      <td className={c.cell}>
        <img src={getStatusIcon()} />
      </td>
      <td className={c.cell}>
        {applicant.firstName} {applicant.lastName}
      </td>
      <td>{applicant.email}</td>
      <td className={c.cell}>
        <p
          onClick={() => handleOpenModal(applicant)}
          style={{ textDecoration: 'underline', cursor: 'pointer' }}>
          Pregledaj detalje
        </p>
      </td>
      <td className={c.cell}>
        <WhiteButton variant='secondary'>Pregledaj CV</WhiteButton>
      </td>
      <td className={c.cell}>
        <WhiteButton variant='primary' disabled={timeLeft?.getTime() === 0}>
          {status === 'accepted' ? 'Ukloni odabir' : 'Odaberi'}
        </WhiteButton>
      </td>
    </tr>
  );
};

export default TableRow;
