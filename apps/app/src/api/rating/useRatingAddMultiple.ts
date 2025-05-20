import { useMutation } from 'react-query';

import { RatingModifyDto } from '@ddays-app/types/src/dto/rating';
import axios from '../base';
import { RatingDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { RouteNames } from '@/router/routes';

const ratingAddMultiple = async (dtos: RatingModifyDto[]) => {
  return axios.post<RatingModifyDto[], RatingDto[]>('/rating', dtos);
};

export const useRatingAddMultiple = () => {
  return useMutation(ratingAddMultiple, {
    onSuccess: (data) => {
      const typedData = data as RatingDto[];

      if (typedData[0].boothId) {
        toast.success('Štand uspješno ocijenjen.', { position: 'top-center' });
      } else if (typedData[0].eventId) {
        toast.success('Događaj uspješno ocijenjen.', {
          position: 'top-center',
        });
      } else {
        toast.success('Ocjena uspješno dodana.', { position: 'top-center' });
      }

      setTimeout(() => {
        window.location.href = RouteNames.HOME;
      }, 1000);
    },
    onError: () => {
      toast.error('Greška prilikom dodavanja ocjene.', {
        position: 'top-center',
      });
    },
  });
};
