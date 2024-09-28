import { useSpeakerWithCompanyGetAll } from '../../api/speaker/useSpeakerWithCompanyGetAll';

const SpeakersSection = () => {
  const speakers = useSpeakerWithCompanyGetAll();

  if (speakers.isLoading || !speakers.data) {
    return null;
  }
};

export default SpeakersSection;
