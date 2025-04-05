import { useEffect, useState } from 'react';
import c from './FlyTalksApplyPage.module.scss';
import { useLocation } from 'react-router-dom';
import { Input } from '../../components/Input';
import Button from '../../components/Button';
import placeholderLogo from '../../assets/images/profico-logo.png';
import FileInput from '../../components/FileInput';
import { validateFlyTalksInput } from '@/helpers/validateInput';

const groupsMock = [
  {
    id: 1,
    start: '10:30',
    end: '11:30',
    day: 1,
    participantsNumber: 10,
    companies: [
      placeholderLogo,
      placeholderLogo,
      placeholderLogo,
      placeholderLogo,
    ],
    hasUserApplied: true,
  },
  {
    id: 2,
    start: '11:30',
    end: '12:30',
    day: 1,
    participantsNumber: 10,
    companies: [
      placeholderLogo,
      placeholderLogo,
      placeholderLogo,
      placeholderLogo,
    ],
    hasUserApplied: false,
  },
  {
    id: 3,
    start: '11:30',
    end: '12:30',
    day: 1,
    participantsNumber: 25,
    companies: [
      placeholderLogo,
      placeholderLogo,
      placeholderLogo,
      placeholderLogo,
    ],
    hasUserApplied: false,
  },
  {
    id: 4,
    start: '10:30',
    end: '11:30',
    day: 2,
    participantsNumber: 10,
    companies: [
      placeholderLogo,
      placeholderLogo,
      placeholderLogo,
      placeholderLogo,
    ],
    hasUserApplied: false,
  },
  {
    id: 5,
    start: '11:30',
    end: '12:30',
    day: 2,
    participantsNumber: 10,
    companies: [
      placeholderLogo,
      placeholderLogo,
      placeholderLogo,
      placeholderLogo,
    ],
    hasUserApplied: false,
  },
];

const FlyTalksApplyPage = () => {
  const location = useLocation();
  const [group, setGroup] = useState<(typeof groupsMock)[0] | undefined>(
    undefined,
  );

  const [userData, setUserData] = useState<{
    linkedIn: string;
    github: string;
    portfolio: string;
    about: string;
    file: File | undefined;
  }>({
    linkedIn: '',
    github: '',
    portfolio: '',
    about: '',
    file: undefined,
  });
  const [isFormValid, setIsFormValid] = useState<boolean | undefined>(
    undefined,
  );
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const groupId = queryParams.get('id');

    if (groupId) {
      const foundGroup = groupsMock.find(
        (group) => group.id === Number(groupId),
      );
      setGroup(foundGroup);
    }
  }, [location.search]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));

    if (name === 'about') {
      const wordCount = value
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length;
      setWordCount(wordCount);
    }
  };

  const handleApply = () => {
    if (Object.values(userData).some((value) => value === '')) {
      setIsFormValid(false);
    }
  };

  const handleError = (field: keyof typeof userData) => {
    const errorMessage = validateFlyTalksInput([field], {
      [field]: userData[field],
    });
    return errorMessage;
  };

  return (
    <div className={c.page}>
      <header className={c.header}>
        <p>PRIJE PRIJAVE...</p>
      </header>
      <main className={c.main}>
        <div className={c.mainContent}>
          <div className={c.timeContainer}>
            <p className={c.dateParagraph}>
              {group?.day === 1 ? '23.5 // PETAK' : '24.5 //SUBOTA'}
            </p>
            <p className={c.timeParagraph}>
              {group?.start} - {group?.end}
            </p>
          </div>
          <p className={c.infoParagraph}>
            Predobro bi bilo da odgovoriš na dva pitanja koja će bit obavezna
            kako bi firme mogle bolje te prosudit i odbit te na temelju toga.
          </p>
          <p className={c.applyStepsParagraph}>
            <span>01</span> LINKOVI
          </p>
          <Input
            value={userData.linkedIn}
            type='text'
            name='linkedIn'
            placeholder='LinkedIn'
            onChange={handleInputChange}
            error={isFormValid === false ? handleError('linkedIn') : undefined}
          />
          <Input
            value={userData.github}
            type='text'
            name='github'
            placeholder='Github'
            onChange={handleInputChange}
            error={isFormValid === false ? handleError('github') : undefined}
          />
          <Input
            value={userData.portfolio}
            type='text'
            name='portfolio'
            placeholder='Portfolio'
            onChange={handleInputChange}
            error={isFormValid === false ? handleError('portfolio') : undefined}
          />
          <p className={c.applyStepsParagraph}>
            <span>02</span> UPLOADAJ CV
          </p>
          <FileInput
            file={userData.file}
            setFile={(file) => setUserData((prev) => ({ ...prev, file }))}
            error={isFormValid === false ? handleError('file') : undefined}
            title='priloži životopis'
          />
          <p className={c.applyStepsParagraph}>
            <span>03</span> PREDSTAVI SE...
          </p>
          <Input
            value={userData.about}
            type='text'
            name='about'
            placeholder='Napiši nešto o sebi...'
            onChange={handleInputChange}
            error={isFormValid === false ? handleError('about') : undefined}
          />
          <p className={c.aboutLettersCounter}>{wordCount}/70</p>
          <Button
            variant='orange'
            className={c.nextButton}
            onClick={handleApply}>
            Dalje
          </Button>
        </div>
      </main>
    </div>
  );
};

export default FlyTalksApplyPage;
