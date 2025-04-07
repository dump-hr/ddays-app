import { UserDto } from '@ddays-app/types/src/dto/user';

import CheckIcon from '../../../assets/icons/check.svg';
import XIcon from '../../../assets/icons/x.svg';
import WhiteButton from '../../../components/WhiteButton';
import c from '../FlyTalksPage.module.scss';

type TableRowProps = {
  applicant: UserDto;
  handleOpenModal: (user: UserDto) => void;
  key: number;
  status: 'accepted' | 'rejected';
  //cvHref: string;
  //buttonHandler: () => void;
};

const TableRow: React.FC<TableRowProps> = ({
  applicant,
  handleOpenModal,
  key,
  status,
}) => {
  return (
    <tr key={key}>
      <td className={c.cell}>
        <img src={status === 'accepted' ? CheckIcon : XIcon} />
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
        <WhiteButton variant='primary'>
          {status === 'accepted' ? 'Ukloni odabir' : 'Odaberi'}
        </WhiteButton>
      </td>
    </tr>
  );
};

export default TableRow;
