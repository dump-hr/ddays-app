import { UserWithAvatarDto } from '@ddays-app/types';
import axios from '../base';
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

const createTemporaryAvatar = async (
  blob: Blob,
): Promise<{ profilePhotoUrl: string }> => {
  const formData = new FormData();
  formData.append('avatar', blob, 'avatar.png');
  return await axios.postForm<FormData, { profilePhotoUrl: string }>(
    '/avatar/create-temporary',
    formData,
  );
};

export const useUploadAvatar = (
  onSuccess?: (data: UserWithAvatarDto) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation(uploadAvatar, {
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data);
      queryClient.invalidateQueries(['user']);
      toast.success('Avatar uspješno spremljen!');
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error: string) => {
      toast.error(error || 'Greška prilikom spremanja avatara');
    },
  });
};

export const useCreateTemporaryAvatar = (
  onSuccess?: (data: { profilePhotoUrl: string }) => void,
) => {
  return useMutation(createTemporaryAvatar, {
    onSuccess: (data) => {
      toast.success('Avatar uspješno spremljen!');
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error: string) => {
      toast.error(error || 'Greška prilikom spremanja avatara');
    },
  });
};
