import React, { useEffect } from 'react'
import './style.css';
import { usePagination } from '../../../../hooks';
import BoardListItem from '../../../../types/board-list-item.interface';
import { userBoardListMock } from '../../../../mocks';

export default function Search() {

    const { currentPageNumber, setCurrentPageNumber, currentSectionNumber, setCurrentSectionNumber,
        viewBoardList, viewPageNumberList, totalSection, setBoardList } = usePagination<BoardListItem>(5);
    
    // useEffect : 특정 상태가 변경될 때마다 실행되는 코드를 지정하는 함수
    useEffect(() => {
        setBoardList(userBoardListMock);
    }, []);

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
                <div className='board-result-page-box-content-box-search-result'>{'"아무거나"검색 결과'}</div>
                <div className='board-result-page-box-content-box-no-result'>{'게시글이 존재하지 않습니다.'}</div>
                <div className='pagination'></div>
            </div>
        </div>
    </div>
  )
}
