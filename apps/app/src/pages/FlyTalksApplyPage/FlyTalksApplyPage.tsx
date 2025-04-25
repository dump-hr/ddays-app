import { useEffect, useMemo, useState } from 'react';
import c from './FlyTalksApplyPage.module.scss';
import { useLocation } from 'react-router-dom';
import { Input } from '../../components/Input';
import Button from '../../components/Button';
import FileInput from '../../components/FileInput';
import { validateFlyTalksInput } from '@/helpers/validateInput';
import ConfirmationPopup from './ConfirmationPopup';
import { useGetAllFlyTalkGroups } from '@/api/flyTalks/useGetGroupCompanies';
import { usePostApplyToFlyTalks } from '@/api/flyTalks/usePostApplyToFlyTalks';
import { useLoggedInUser } from '@/api/auth/useLoggedInUser';
import { useUploadCV } from '@/api/flyTalks/usePostUploadCV';

const FlyTalksApplyPage = () => {
  const location = useLocation();
  const { data: event } = useGetAllFlyTalkGroups();
  const { data: currentUser } = useLoggedInUser();
  const postApplyToFlyTalks = usePostApplyToFlyTalks();
  const uploadCV = useUploadCV();

  const groups = useMemo(() => {
    return (
      event?.map((event) => ({
        id: event.id,
        start: event.startsAt.split('T')[1].slice(0, 5),
        end: event.endsAt.split('T')[1].slice(0, 5),
        day: event.startsAt.split('T')[0] === '2025-05-23' ? 1 : 2,
        participantsNumber: Array.isArray(event.users) ? event.users.length : 0,
        hasUserApplied: Array.isArray(event.users)
          ? event.users.some((user) => user.id === 1)
          : false,
        companies: Array.isArray(event.companies)
          ? event.companies.map((company) => ({
              ...company,
              logoImage: company.logoImage || '',
            }))
          : [],
      })) || []
    );
  }, [event]);

  const [group, setGroup] = useState<(typeof groups)[0] | undefined>(undefined);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [uploadedCVUrl, setUploadedCVUrl] = useState<string | undefined>(
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
      const foundGroup = groups.find((group) => group.id === Number(groupId));
      setGroup(foundGroup);
    }
  }, [location.search, groups]);

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

  const handleApply = async () => {
    if (
      Object.values(userData).some(
        (value) => value === '' || value === undefined,
      )
    ) {
      setIsFormValid(false);
    } else {
      postApplyToFlyTalks.mutate(
        {
          userId: currentUser?.id ?? 0,
          eventId: group?.id ?? 0,
          linkedinProfile: userData.linkedIn,
          githubProfile: userData.github,
          portfolioProfile: userData.portfolio,
          cv: uploadedCVUrl,
          description: userData.about,
        },
        {
          onSuccess: () => {
            setIsConfirmationPopupOpen(true);
          },
        },
      );
    }
  };

  const handleApplyCV = async (file: File) => {
    if (file) {
      await uploadCV.mutateAsync(file, {
        onSuccess: (cvUrl) => {
          setUserData((prevUserData) => ({
            ...prevUserData,
            file: file,
          }));
          setUploadedCVUrl(cvUrl);
        },
      });
      return;
    }
    setUserData((prevUserData) => ({
      ...prevUserData,
      file: undefined,
    }));
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
              {group?.day === 1 ? '23.5 // PETAK' : '24.5 // SUBOTA'}
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
            setFile={(file) => handleApplyCV(file as File)}
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
      <ConfirmationPopup
        isOpen={isConfirmationPopupOpen}
        onClose={() => {
          setIsConfirmationPopupOpen(false);
        }}
        group={group}
      />
    </div>
  );
};

export default FlyTalksApplyPage;
