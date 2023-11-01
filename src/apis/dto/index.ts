import axios from "axios";
import { SignInRequestDto } from "./request/auth";
import ResponseDto from "./response";
import SignInResponseDto from "./response/auth/sign-in-response.dto";

// description: Domain URL //
const DOMAIN = 'http://';
// description: API Domain 주소 //
const API_DOMAIN = `${DOMAIN}/columbus`;

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