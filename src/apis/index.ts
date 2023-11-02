import axios from "axios";
import { SignInRequestDto } from "./dto/request/auth";
import ResponseDto from "./dto/response";
import SignInResponseDto from "./dto/response/auth/sign-in-response.dto";

// description: Domain URL //
const DOMAIN = 'http://localhost:4000';
// description: API Domain 주소 //
const API_DOMAIN = `${DOMAIN}/columbus/api`;

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