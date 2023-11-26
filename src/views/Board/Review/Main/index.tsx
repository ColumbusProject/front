import React, { useEffect, useState } from 'react'
import './style.css';
import { BoardListItem } from 'types';
import { userBoardListMock } from '../../../../mocks';
import BoardItem from '../../../../components/BoardItem';
import { usePagination } from '../../../../hooks';
import Pagination from '../../../../components/Pagination';
import { useNavigate } from 'react-router-dom';
import { BOARD_REVIEW_WRITE_PATH } from 'constant';

export default function ReviewMain() {

    //          function: 네이게이트 함수          //
    const navigator = useNavigate();

    //          event handler: 여행 후기 글쓰기 클릭 이벤트 처리 함수          //
    const onReviewWriteClick = () => {
        navigator(BOARD_REVIEW_WRITE_PATH());
    }

 const {
    currentPageNumber, 
    setCurrentPageNumber, 
    currentSectionNumber, 
    setCurrentSectionNumber,
    viewBoardList,
    viewPageNumberList,
    totalSection,
    setBoardList,
    } = usePagination<BoardListItem>(5);

 useEffect(() => {
    setBoardList(userBoardListMock);
 }, []);

  return (
    <div className='board-main-box'>
        <div className='board-main-box-container'>
            <div className='board-main-box-container-01'>
                <div className='board-main-box-container-01-01'>
                    <div className='board-review-board'>{'여행 후기 게시판'}</div>
                    <div className='board-search'>
                        <div className='board-search-icon'></div>
                    </div>
                </div>
                <div className='board-main-box-container-01-02'>
                    <div className='board-write' onClick={onReviewWriteClick}>{'여행 후기 글쓰기'}</div>
                </div>
            </div>
            <div className='board-main-box-divider'></div>
            <div className='board-main-box-container-02'>
                <div className='board-main-box-container-02-01'>
                    {viewBoardList.map(item => <BoardItem boardItem={item} />)}
                </div>
                <div className='board-main-box-container-02-02'>
                    <Pagination
                        currentPageNumber={currentPageNumber}
                        setCurrentPageNumber={setCurrentPageNumber}
                        currentSectionNumber={currentSectionNumber}
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
