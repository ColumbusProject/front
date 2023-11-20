import React, { useEffect, useState } from 'react'
import './style.css';
import BoardListItem from 'types/board-list-item.interface';
import { Board, CommentListItem, CommentListItem02, LoginUser2 } from 'types';
import { boardMock, commentListMock, commentListMock02 } from 'mocks';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import { AUTH_PATH, BOARD_UPDATE_PATH, MAIN_PATH } from 'constant';
import GetBoardResponseDto from 'apis/dto/response/board/get-board-response.dto';
import ResponseDto from 'apis/dto/response';
import { useUserStore } from 'stores';
import { deleteBoardRequest, getBoardRequest, getCommentListRequest, postCommentRequest } from 'apis';
import { useCookies } from 'react-cookie';
import CommentItem from 'components/CommentItem';
import CommentItem02 from 'components/CommentItem02';
import Pagination from 'components/Pagination';
import { usePagination } from 'hooks';
import PostCommentRequestDto from 'apis/dto/request/auth/board/post-comment.request.dto';
import GetCommentListResponseDto from 'apis/dto/response/board/get-comment-list.response.dto';
import axios from 'axios';


export default function Detail() {

  const {
    currentPageNumber, 
    setCurrentPageNumber, 
    currentSectionNumber, 
    setCurrentSectionNumber,
    viewBoardList,
    viewPageNumberList,
    totalSection,
    setBoardList,
  } = usePagination<CommentListItem02>(3);

  useEffect(() => {
    setBoardList(commentListMock02);
  }, []);

  const { boardNumber } = useParams();

  const { user } = useUserStore();

  const [loginUserMock, setUser] = useState<LoginUser2[]>([]); 

  const [board, setBoard] = useState<Board | null>(null);

  const [isWriter, setWriter] = useState<boolean>(true);

  const [showMore, setShowMore] = useState<boolean>(false);

  const [upDown, setUpDown] = useState<boolean>(false);

  const [commentClick, setCommentClick] = useState<boolean>(false);

  const [commentList, setCommentList] = useState<CommentListItem[]>([]);

  const [commentList02, setCommentList02] = useState<CommentListItem02[]>([]);

  const navigator = useNavigate();

  const [cookies, setCookie] = useCookies();

  const [commentsCount, setCommentsCount] = useState<number>(0);

  const [favoriteCount, setFavoriteCount] = useState<number>(0);

  const [showComments, setShowComments] = useState<boolean>(false);

  const [showFavorite, setShowFavorite] = useState<boolean>(false);

  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    setBoard(boardMock);
  }, []);

  // useEffect(() => {
  //   setCommentList(commentListMock);
  //   setCommentList02(commentListMock02);
  // }, []);

  const getWriteDatetimeFormat = (writeDatetime: string | undefined) => {
    if (!writeDatetime) return '';
    const date = dayjs(writeDatetime);
    return date.format('YYYY.MM.DD');
  };

  const getBoardResponse = (responseBody: GetBoardResponseDto | ResponseDto) => {
    const { code } = responseBody;
    if (code === 'NB') alert('존재하지 않는 게시물입니다.');
    if (code === 'DBE') alert('데이터베이스 오류입니다.');
    if (code !== 'SU') {
      navigator(MAIN_PATH);
      return;
    }

    const board: Board = { ...responseBody as GetBoardResponseDto };
    setBoard(board);

    if (!user) return;
    const isWriter = user.email === board.writerEmail;
    setWriter(isWriter);
  };

  const onMoreButtonClickHandler = () => {
    setShowMore(!showMore);
  };

  const onUpdateButtonClickHandler = () => {
    if (!boardNumber) return;
    navigator(BOARD_UPDATE_PATH(boardNumber));
  };

  const onDeleteButtonClickHandler = () => {
    const accessToken = cookies.accessToken;
    if (!boardNumber || !accessToken) return;
    deleteBoardRequest(boardNumber, accessToken).then(deleteBoardResponse);
  };

  const deleteBoardResponse = (code: string) => {
    if (code === 'VF') alert('잘못된 접근입니다.');
    if (code === 'NU' || code === 'AF') {
      navigator(AUTH_PATH);
      return;
    } 
    if (code === 'NB') alert('존재하지 않는 게시물입니다.');
    if (code === 'NP') alert('권한이 없습니다.');
    if (code === 'DBE') alert('데이터베이스 오류입니다.');
    if (code !== 'SU') return;

    navigator(MAIN_PATH);
  }

  const favoriteUpDownClickHandler = () => {
    setShowFavorite(!showFavorite);
  };

  const commentUpDownClickHandler = () => {
    setShowComments(!showComments);
  };

//           function: get comment list response 처리 함수          //
  const getCommentListResponse = (responseBody: GetCommentListResponseDto | ResponseDto) => {
  const { code } = responseBody;
  if (code === 'NB') alert('존재하지 않는 게시물입니다.');
  if (code === 'DBE') alert('데이터베이스 오류입니다.');
  if (code !== 'SU') return;
  
  const { commentList } = responseBody as GetCommentListResponseDto;
  setBoardList(commentList);
  setCommentsCount(commentList.length);
  };

//           function: post comment response 처리 함수          //
 const postCommentResponse = (code: string) => {
  if (code === 'VF') alert('잘못된 접근입니다.');
  if (code === 'NB') alert('존재하지 않는 게시물입니다.');
  if (code === 'NU') alert('존재하지 않는 유저입니다.');
  if (code === 'AF') alert('인증에 실패했습니다.');
  if (code === 'DBE') alert('데이터베이스 오류입니다.');
  if (code !== 'SU') return;
  
  setComment('');
  if (!boardNumber)  return;
  getCommentListRequest(boardNumber).then(getCommentListResponse);
  }

  //          event handler: 댓글 작성 버튼 이벤트 처리          //
  const onCommentButtonClickHandler = () => {
    const accessToken = cookies.accessToken;
    if(!accessToken) {
      alert('로그인이 필요합니다.');
      return;
    }
    if(!boardNumber) return;

    const requestBody: PostCommentRequestDto = {
      content: comment
    };

    postCommentRequest(requestBody, boardNumber, accessToken).then(postCommentResponse);
  }

  useEffect(() => {
    if (!boardNumber) {
      alert('잘못된 접근입니다.');
      navigator(MAIN_PATH);
      return;
    }
    getBoardRequest(boardNumber).then(getBoardResponse);
  }, []);


  //          render: 상단 컴포넌트 렌더링          //
  return (
    <div className='board-detail'>
      <div className='board-detail-box'>
        <div className='board-detail-box-01'>
          <div className='board-detail-box-01-title-box'>
            <div className='board-detail-box-01-title'>{board?.title}</div>
          </div>
          <div className='board-detail-box-01-rorem'>
            <div className='board-detail-box-01-rorem-profile-image'>{board?.writerProfileImage}</div>
            <div className='board-detial-box-01-rorem-nickname-datetime-box'>
              <div className='nickname-datetime'>{`${board?.writerNickname} | ${getWriteDatetimeFormat(board?.writeDatetime)}`}</div>
            </div>
            <div className='board-detail-box-01-view-count'>{'조회수 '}{board?.viewCount}</div>
            {isWriter && (
              <div className='board-detail-box-01-more' onClick={onMoreButtonClickHandler}></div>
            )}
            {showMore && (
            <div className='more-box'>
              <div className='more-update-button' onClick={onUpdateButtonClickHandler}>{'수정'}</div>
              <div className='divider-01'></div>
              <div className='more-delete-button' onClick={onDeleteButtonClickHandler}>{'삭제'}</div>
            </div>
            )}
          </div>
        </div>
        <div className='divider'></div>
        <div className='board-detail-box-02'>
          <div className='board-detail-location-icon'></div>
          <div className='board-detail-location-name'>{board?.location}</div>
        </div>
        <div className='board-detail-box-03'>
          <div className='board-detail-box-03-content'>{board?.content}</div>
          <div className='board-detail-box-03-image-box'>
          {board?.boardImageList.map(image => (
            <div className='board-detail-box-03-content-image' style={{ backgroundImage: `url(${image})` }}></div>
          ))}
          </div>
        </div>
        <div className='board-detail-box-04'>
          <div className='board-detail-box-04-heart'></div>
          <div className='heart-count-box'>
            <div className='heart-count'>{favoriteCount}</div>
          </div>
          <div className='board-detail-box-04-up-down' onClick={favoriteUpDownClickHandler}></div>
          <div className='board-detail-box-04-comment'></div>
          <div className='comment-count-box'>
              <div className='comment-count'>{commentsCount}</div>
          </div>
          <div className='board-detail-box-04-up-down' onClick={commentUpDownClickHandler}></div>
        </div>
        {showFavorite && (
        <div className='board-detail-box-05'>
         <div className='board-detail-box-05-favorite-count-box'>
          <div className='favorite-count'>{`좋아요 ${favoriteCount}`}</div>
         </div>
         <div className='board-detail-box-05-profile-box'>
          {commentList.map(item => <CommentItem commentItem={item} />)}
         </div>
        </div>
        )}
        {showComments && (
        <div className='board-detail-box-06'>
        <div className='box-01'>
          <div className='box-01-comment-count-box'>
            <div className='box-01-comment-count'>{`댓글 ${commentsCount}`}</div>
          </div>
          {viewBoardList.map(item => <CommentItem02 commentListItem02={item} />)}
        </div>
        <div className='pagination'>
        <Pagination
            currentPageNumber={currentPageNumber}
            setCurrentPageNumber={setCurrentPageNumber}
            currentSectionNumber={currentSectionNumber}
            setCurrentSectionNumber={setCurrentSectionNumber}
            viewPageNumberList={viewPageNumberList}
            totalSection={totalSection}
          />
        </div>
        <div className='box-02'>
          <div className='box-02-01'></div>
          <div className='box-02-02'>
            <div className='box-02-02-comment-write-box' onClick={onCommentButtonClickHandler}>
              <div className='box-02-02-comment-write'>{'댓글달기'}</div>
            </div>
          </div>
        </div>
      </div>
        )}
      </div>
    </div>
  )



//          render: 하단 컴포넌트 렌더링          //
  // return (
  //   <div className='board-detail-bottom'>
  //     <div></div>
  //   </div>
  // )
};



