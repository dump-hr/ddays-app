import { useEffect, useState } from 'react';
import c from './FlyTalksApplyPage.module.scss';
import { useLocation } from 'react-router-dom';
import { Input } from '../../components/Input';
import Button from '../../components/Button';
import placeholderLogo from '../../assets/images/profico-logo.png'
import FileInput from '../../components/FileInput';

const groupsMock = [
  {
    id: 1,
    start: '10:30',
    end: '11:30',
    day: 1,
    participantsNumber: 10,
    companies: [placeholderLogo, placeholderLogo, placeholderLogo, placeholderLogo],
    hasUserApplied: true,
  },
  {
    id: 2,
    start: '11:30',
    end: '12:30',
    day: 1,
    participantsNumber: 10,
    companies: [placeholderLogo, placeholderLogo, placeholderLogo, placeholderLogo],
    hasUserApplied: false,
  },
  {
    id: 3,
    start: '11:30',
    end: '12:30',
    day: 1,
    participantsNumber: 25,
    companies: [placeholderLogo, placeholderLogo, placeholderLogo, placeholderLogo],
    hasUserApplied: false,
  },
  {
    id: 4,
    start: '10:30',
    end: '11:30',
    day: 2,
    participantsNumber: 10,
    companies: [placeholderLogo, placeholderLogo, placeholderLogo, placeholderLogo],
    hasUserApplied: false,
  },
  {
    id: 5,
    start: '11:30',
    end: '12:30',
    day: 2,
    participantsNumber: 10,
    companies: [placeholderLogo, placeholderLogo, placeholderLogo, placeholderLogo],
    hasUserApplied: false,
  },
];

const FlyTalksApplyPage = () => {
  const location = useLocation();
  const [group, setGroup] = useState<(typeof groupsMock)[0] | undefined>(
    undefined,
  );
  const [linkedIn, setLinkedIn] = useState('');
  const [github, setGithub] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [about, setAbout] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [file, setFile] = useState<File | undefined>(undefined);

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

  const handleLinkedInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLinkedIn(event.target.value);
  };

  const handleGithubChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGithub(event.target.value);
  };

  const handlePortfolioChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPortfolio(event.target.value);
  };

  const handleAboutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAbout(value);
    const wordCount = value
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    setWordCount(wordCount);
  };

  console.log(file);

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
            value={linkedIn}
            type='text'
            placeholder='LinkedIn'
            onChange={handleLinkedInChange}
          />
          <Input
            value={github}
            type='text'
            placeholder='Github'
            onChange={handleGithubChange}
          />
          <Input
            value={portfolio}
            type='text'
            placeholder='Portfolio'
            onChange={handlePortfolioChange}
          />
          <p className={c.applyStepsParagraph}>
            <span>02</span> UPLOADAJ CV
          </p>
          <FileInput file={file} setFile={setFile} />
          <p className={c.applyStepsParagraph}>
            <span>03</span> PREDSTAVI SE...
          </p>
          <Input
            value={about}
            type='text'
            placeholder='Napiši nešto o sebi...'
            onChange={handleAboutChange}
          />
          <p className={c.aboutLettersCounter}>{wordCount}/70</p>
          <Button variant='orange' className={c.nextButton}>Dalje</Button>
        </div>
      </main>
    </div>
  );
};

export default FlyTalksApplyPage;
