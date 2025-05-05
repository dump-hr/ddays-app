import { useAchievementCompleteByName } from '@/api/achievement/useAchievementCompleteByName';
import { useState } from 'react';

const TestPage = () => {
  const { mutate: completeAchievementByName } = useAchievementCompleteByName();
  const [text, setText] = useState<string>('');

  return (
    <>
      <h1>Hook Test Page</h1>
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Unesi ime'
      />
      <button
        onClick={() => {
          completeAchievementByName(text);
        }}>
        Unesi
      </button>
    </>
  );
};

export default TestPage;
