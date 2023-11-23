import React, { useEffect, useState } from 'react'
import './style.css';
import { usePagination } from '../../../../hooks';
import { BoardListItem } from 'types'; 
import { userBoardListMock } from '../../../../mocks';
import Pagination from 'components/Pagination';
import { useNavigate, useParams } from 'react-router-dom';
import ResponseDto from 'apis/dto/response';
import GetSearchBoardListResponseDto from 'apis/dto/response/board/get-search-board-list-.response.dto';

export default function Search() {
    //          state: 검색어 path variable 상태          //
    const {word} = useParams();

    //          state: 페이지네이션 관련 상태          //
    const { currentPageNumber, setCurrentPageNumber, currentSectionNumber, setCurrentSectionNumber,
        viewBoardList, viewPageNumberList, totalSection, setBoardList } = usePagination<BoardListItem>(5);
    //          state: 검색 결과 개수 상태          //
    const [count, setCount] = useState<number>(0);

    //          function: 네비게이트 함수          //
    const navigator = useNavigate();
    //          function: get search board list response 처리 함수          //
    const getSearchBoardListResponse = (responseBody: GetSearchBoardListResponseDto | ResponseDto) => {
        const {code} = responseBody;
        if (code === 'DBE') alert('데이터베이스 오류입니다.');
        if (code !== 'SU') return;

        const {searchList}  = responseBody as GetSearchBoardListResponseDto;
        setBoardList(searchList);
        setCount(searchList.length);
    };
    
    // useEffect : 특정 상태가 변경될 때마다 실행되는 코드를 지정하는 함수
    useEffect(()=>{
        setBoardList(userBoardListMock);
    },[]);

  return (
    <div className='board-noresult-page'>
        <div className='board-result-page-box'>
            <div className='board-result-page-box-top'>
                <div className='board-result-page-box-top-1'>
                    <div className='board-result-page-box-top-1-title'>{'여행 후기 게시판'}</div>
                    <div className='board-result-page-box-top-1-search-box'>
                        <input className='board-result-page-box-top-1-search' />
                        <div className='board-result-page-box-top-1-search-icon'></div>
                    </div>
                </div>
                <div className='board-result-page-box-top-2'>
                    <div className='board-result-page-box-2-write'>{'여행 후기 글쓰기'}</div>
                </div>
            </div>
            <div className='divider'></div>
            <div className='board-result-page-box-content-box'>
                <div className='board-result-page-box-content-box-search-result'><span className='search-title-emphasis'>{word}</span>{'검색 결과'}</div>
                <div className='board-result-page-box-content-box-no-result'>{'게시글이 존재하지 않습니다.'}</div>
                <div className='pagination'>
                    <Pagination
                    currentPageNumber={currentPageNumber}
                    setCurrentPageNumber={setCurrentPageNumber}
                    currentSectionNumber={currentPageNumber}
                    setCurrentSectionNumber={setCurrentSectionNumber}
                    viewPageNumberList={viewPageNumberList}
                    totalSection={totalSection}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}
