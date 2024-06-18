import useAxiosAuth from "@/app/hooks/useAxiosAuth";
import { types } from "../../../../../types/models";


export const useUserApi = () => {
  const axiosAuth = useAxiosAuth();

  const createUser = async (
    requestParameters: types.CreateUserRequest
  ): Promise<types.ApiResponseSuccess<types.CreateUserResponse>> => {

    const response = await axiosAuth.post<
      types.ApiResponseSuccess<types.CreateUserResponse>>
      ('/create-user', requestParameters);
    return response.data;
  };

  const getUsers = async (): Promise<types.ApiResponseSuccess<any>> => {

    const response = await axiosAuth.get<
      types.ApiResponseSuccess<any>>
      ('/get-all-users');
    return response.data;
  };

  const getSingleUser = async (requestParameters: string): Promise<types.ApiResponseSuccess<any>> => {
    const response = await axiosAuth.get<
      types.ApiResponseSuccess<any>>
      (`/get-single-user/${requestParameters}`);
    return response.data;
  };

  const updateUser = async (
    data: any
  ): Promise<types.ApiResponseSuccess<any>> => {

    const formData = new FormData();

    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    formData.append('state', data.state);
    formData.append('lga', data.lga);
    formData.append('phone', data.phone);
    formData.append('age', data.age.toString());
    formData.append('gender', data.gender);
    formData.append('address', data.address);

    if(data.userType.length > 0) {
      formData.append('userType', JSON.stringify(data.userType));
    }

    const response = await axiosAuth.put<
      types.ApiResponseSuccess<any>>
      (`/update-user-profile/${data.userId}`, formData);
    return response.data;
  };

  const forgotPassword = async (
    requestParameters: any
  ): Promise<types.ApiResponseSuccess<any>> => {

    const response = await axiosAuth.post<
      types.ApiResponseSuccess<any>>
      ('/send-password-reset-link', requestParameters);
    return response.data;
  };

  const resetPassword = async (
    requestParameters: any
  ): Promise<types.ApiResponseSuccess<any>> => {

    const response = await axiosAuth.post<
      types.ApiResponseSuccess<any>>
      ('/reset-password', requestParameters);
    return response.data;
  };

  const signUp = async (
    requestParameters: any
  ): Promise<types.ApiResponseSuccess<any>> => {

    const response = await axiosAuth.post<
      types.ApiResponseSuccess<any>>
      ('/sign-up', requestParameters);
    return response.data;
  };

  const sendSignUpToken = async (
    requestParameters: any
  ): Promise<types.ApiResponseSuccess<any>> => {

    const response = await axiosAuth.post<
      types.ApiResponseSuccess<any>>
      ('/send-signup-otp', requestParameters);
    return response.data;
  };

  const validateSignUpToken = async (
    requestParameters: any
  ): Promise<types.ApiResponseSuccess<any>> => {

    const response = await axiosAuth.post<
      types.ApiResponseSuccess<any>>
      ('/validate-signup-otp', requestParameters);
    return response.data;
  };

  const updateUserOnboarding = async (
    requestParameters: any
  ): Promise<types.ApiResponseSuccess<any>> => {

    const response = await axiosAuth.put<
      types.ApiResponseSuccess<any>>
      ('/update-user-onboarding', requestParameters);
    return response.data;
  };

  const resetUserPassword = async (
    requestParameters: any
  ): Promise<types.ApiResponseSuccess<any>> => {

    const response = await axiosAuth.put<
      types.ApiResponseSuccess<any>>
      ('/reset-user-password', requestParameters);
    return response.data;
  }; 

  const toggleUserStatus = async (
    requestParameters: string
  ): Promise<types.ApiResponseSuccess<any>> => {
    const response = await axiosAuth.put<
      types.ApiResponseSuccess<any>>
      (`/toggle-user-status/${requestParameters}` );
    return response.data;
  }; 

  return {
    toggleUserStatus,
    resetUserPassword,
    updateUserOnboarding,
    validateSignUpToken,
    resetPassword,
    sendSignUpToken,
    signUp,
    updateUser,
    forgotPassword,
    getSingleUser,
    getUsers,
    createUser,
  };
};
