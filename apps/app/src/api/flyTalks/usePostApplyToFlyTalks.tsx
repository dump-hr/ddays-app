import { QUERY_KEYS } from "@/constants/queryKeys";
import { UserToEventDto } from "@ddays-app/types";
import axios from "../base";
import toast from "react-hot-toast";
import { useMutation, QueryClient } from "react-query";

const queryClient = new QueryClient();


const postApplyToFlyTalks = async (data: UserToEventDto): Promise<UserToEventDto> => {
    return axios.post<UserToEventDto, UserToEventDto>('/event/apply-to-flytalk', data);
}

export const usePostApplyToFlyTalks = () => {
    return useMutation(
        postApplyToFlyTalks, {
            onSuccess: () => {
                queryClient.invalidateQueries([QUERY_KEYS.applyFlyTalk]);
              },
              onError: (error: import("axios").AxiosError<{ message?: string }>) => {
                console.error("Error applying to FlyTalk:", error);
                const errorMessage = error?.response?.data?.message || error?.message || "An unexpected error occurred.";
                toast.error(errorMessage);
            },
        }
        
    );
};