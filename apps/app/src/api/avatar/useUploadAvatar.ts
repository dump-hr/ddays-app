import { UserWithAvatarDto } from '@ddays-app/types';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

interface AvatarOptions {
  colors: string;
  face: string;
  accessories: string;
  body: string;
}

const uploadAvatar = async ({
  blob,
  options,
}: {
  blob: Blob;
  options: AvatarOptions;
}): Promise<UserWithAvatarDto> => {
  const formData = new FormData();
  formData.append('avatar', blob, 'avatar.png');

  Object.entries(options).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return await axios.postForm<FormData, UserWithAvatarDto>(
    '/avatar/upload',
    formData,
  );
};

export const useUploadAvatar = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation(uploadAvatar, {
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data);

      queryClient.invalidateQueries(['user']);

      toast.success('Avatar uspješno spremljen!');

      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: string) => {
      toast.error(error || 'Greška prilikom spremanja avatara');
    },
  });
};
