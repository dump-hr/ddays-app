import axios from '../base';
import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { CodeDto } from '@ddays-app/types';

const codeApply = (code: string) => {
  return axios.post<string, CodeDto>(`/code/apply/${code}`);
};

export const useCodeApply = () => {
  const queryClient = useQueryClient();

  return useMutation<CodeDto, Error, string>(
    [QUERY_KEYS.codes],
    (code: string) => codeApply(code),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries([QUERY_KEYS.leaderboard]);
        void queryClient.invalidateQueries([QUERY_KEYS.leaderboardUserRank]);
      },
    },
  );
};
