import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import './style.css';
import { ReviewBoardListItem } from 'types';
import { reviewBoardListMock } from '../../../../mocks';
import ReviewBoardItem from '../../../../components/ReviewBoardItem';
import { usePagination } from '../../../../hooks';
import Pagination from '../../../../components/Pagination';
import { useNavigate } from 'react-router-dom';
import { BOARD_REVIEW_SEARCH_PATH, BOARD_REVIEW_WRITE_PATH } from 'constant';

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
        } = usePagination<ReviewBoardListItem>(5);

    useEffect(() => {
        setBoardList(reviewBoardListMock);
    }, []);

 //          component: 검색 컴포넌트          //
 const Search = () => {
    //          state: 검색 버튼 상태          //
    const [showInput, setShowInput] = useState<boolean>(false);
    //          state: 검색 값 상태          //
    const [searchValue, setSearchValue] = useState<string>('');

    //          event handler: 검색 값 변경 이벤트 처리          //
    const onSearchValueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value;
        setSearchValue(searchValue);
    }
    //          event handler: 검색 인풋 Enter key down 이벤트 처리          //
    const onSearchEnterKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        if (!searchValue) return;
        navigator(BOARD_REVIEW_SEARCH_PATH(searchValue));
    }
    //          event handler: 검색 버튼 클릭 이벤트 처리          //
    const onSearchButtonClickHandler = () => {
        if (!showInput) {
            setShowInput(true);
            return;
        }
        if (!searchValue) {
            setShowInput(false);
            return;
        }
        navigator(BOARD_REVIEW_SEARCH_PATH(searchValue));
    }

    return (
        <div className='board-search'>
            <input className='board-search-input' type='text' value={searchValue} onChange={onSearchValueChangeHandler} onKeyDown={onSearchEnterKeyDownHandler}/>
            <div className='board-search-icon' onClick={onSearchButtonClickHandler}></div>
        </div>   
    )
}
return (
    <div className='board-main-box'>
        <div className='board-main-box-container'>
            <div className='board-main-box-container-01'>
                <div className='board-main-box-container-01-01'>
                    <div className='board-review-board'>{'여행 후기 게시판'}</div>
                    <Search />
                </div>
                <div className='board-main-box-container-01-02'>
                    <div className='board-write' onClick={onReviewWriteClick}>{'여행 후기 글쓰기'}</div>
                </div>
            </div>
            <div className='board-main-box-divider'></div>
            <div className='board-main-box-container-02'>
                <div className='board-main-box-container-02-01'>
                    {viewBoardList.map(item => <ReviewBoardItem boardItem={item} />)}
                </div>
                <div className='board-main-box-container-02-02'>
                    <div className='board-main-box-container-02-02-pagination-box'>
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
    </div>
)
}
