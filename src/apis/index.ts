import axios from "axios";
import { SignInRequestDto } from "./dto/request/auth";
import ResponseDto from "./dto/response";
import SignInResponseDto from "./dto/response/auth/sign-in-response.dto";
import GetBoardResponseDto from "./dto/response/board/get-board-response.dto";
import DeleteBoardResponseDto from "./dto/response/board/delete-board.response.dto";
import PostCommentRequestDto from "./dto/request/auth/board/post-comment.request.dto";
import PostCommentResponseDto from "./dto/response/board/post-comment.response.dto";
import GetCommentListResponseDto from "./dto/response/board/get-comment-list.response.dto";

const GET_BOARD_URL = (boardNumber: string | number) => `${API_DOMAIN}/board/${boardNumber}`

// description: Domain URL //
const DOMAIN = 'http://localhost:4000';
// description: API Domain 주소 //
const API_DOMAIN = `${DOMAIN}/columbus/api`;

// description: sign in API end point //
const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;

const DELETE_BOARD_URL = (boardNumber: string | number) => `${API_DOMAIN}/board/${boardNumber}`;

const authorization = (token: string) => { 
  return { headers: { Authorization: `Bearer ${token}` } };
};

// description: post comment API end point //
const POST_COMMENT_URL = (boardNumber: string | number) => `${API_DOMAIN}/board/${boardNumber}/comment`;

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

// description: get board request //
export const getBoardRequest = async (boardNumber: string | number) => {
  const result = await axios.get(GET_BOARD_URL(boardNumber))
      .then(response => {
          const responseBody: GetBoardResponseDto = response.data;
          return responseBody;
      })
      .catch(error => {
          const responseBody: ResponseDto = error.response.data;
          return responseBody;
      });
  return result;
};

// description: get comment list API end point //
const GET_COMMENT_LIST_URL = (boardNumber: string | number) => `${API_DOMAIN}/board/${boardNumber}/comment-list`;

// description: delete board request //
export const deleteBoardRequest = async (boardNumber: string | number, token: string) => {
  const result = await axios.delete(DELETE_BOARD_URL(boardNumber), authorization(token))
      .then(response => {
          const responseBody: DeleteBoardResponseDto = response.data;
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

// description: post comment request //
export const postCommentRequest = async (requestBody: PostCommentRequestDto, boardNumber: string, token: string) => {
  const result = await axios.post(POST_COMMENT_URL(boardNumber), requestBody, authorization(token))
      .then(response => {
          const responseBody: PostCommentResponseDto = response.data;
          const { code } = responseBody;
          return code;
      })
      .catch(error => {
          const responseBody: ResponseDto = error.response.data;
          const { code } = responseBody;
          return code;
      })
  return result;
}

// description: get comment list request //
export const getCommentListRequest = async (boardNumber: string | number) => {
  const result = await axios.get(GET_COMMENT_LIST_URL(boardNumber))
      .then(response => {
          const responseBody: GetCommentListResponseDto = response.data;
          return responseBody;
      })
      .catch(error => {
          const responseBody: ResponseDto = error.response.data;
          return responseBody;
      });
  return result;
};