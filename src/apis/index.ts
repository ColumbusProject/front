import axios from "axios";
import { SignInRequestDto, SignUpRequestDto } from "./dto/request/auth";
import ResponseDto from "./dto/response";
import SignInResponseDto from "./dto/response/auth/sign-in-response.dto";
import { SignUpResponseDto } from "./dto/response/auth";

// description: Domain URL //
const DOMAIN = 'http://localhost:4000';
// description: API Domain 주소 //
const API_DOMAIN = `${DOMAIN}/columbus/api`;
// description: Authorizaition Header //
const authorizaition = (token: string) => { 
  return { headers: { Authorization: `Bearer ${token}`}}};
// description: sign up API end point //
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;
// description: sign in API end point //
const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;

// description: sign in request //
export const signInRequest = async (requestBody: SignInRequestDto) => {
  const result = await axios.post(SIGN_IN_URL(), requestBody)
    .then(response => {
      const responseBody: SignInResponseDto = response.data;
      return responseBody;
    })
    .catch(error => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

// description: sign up request //
export const signUpRequest = async (requestBody: SignUpRequestDto) => {
  const result = await axios.post(SIGN_UP_URL(), requestBody)
    .then(response => {
      const responseBody: SignUpResponseDto = response.data;
      const { code } = responseBody;
      return code;
    })
    .catch(error => {
      const responseBody: ResponseDto = error.response.data;
      const { code } = responseBody;
      return code;
    });
  return result;
}