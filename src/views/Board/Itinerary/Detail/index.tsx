import { useState } from 'react';
import './style.css';
import { commentListMock } from 'mocks';
import ItineraryCommentItem from 'components/ItineraryCommentItem';

export default function ItineraryDetail() {
    //          state: 좋아요 유저 박스 상태          //
    const [viewFavorite, setViewFavorite] = useState<boolean>(false);
    //          state: 댓글 박스 상태          //
    const [viewComment, setViewComment] = useState<boolean>(false);

    //          effect: 좋아요 유저 박스 표시 설정 이벤트         //
    const onViewFavoriteClickHandler = () => {
        setViewFavorite(!viewFavorite);
    }
    //          effect: 댓글 표시 설정 이벤트         //
    const onViewCommentClickHandler = () => {
        setViewComment(!viewComment);
    }

    //          render: 상세 게시물 컴포넌트 렌더링          //
    return(
        <div className='itinerary-detail-wrapper'>
            <div className='detail-top-box'>
                <div className='title'>{'태종대 나들이'}</div>
                <div className='profile-nickname-date-viewcount-more-box'>
                    <div className='profile-image-box'>
                        <div className='profile-image'></div>
                    </div>
                    <div className='nickname-date'>{'봉봉야끼 | 2023.08.31'}</div>
                    <div className='view-count'>{'조회수 0'}</div>
                    <div className='more-box'>
                        <div className='more'></div>
                    </div>
                </div>
            </div>
            <div className='detail-bottom-box'>
                <div className='content-card'>
                    {'mock 데이터 때려박아야됨 위에 타이틀 프로필 이미지 등등 도'}
                </div>
                <div className='favorite-comment-acountbook-box'>
                    <div className='favorite-comment-box'>
                        <div className='favorite-box' onClick={onViewFavoriteClickHandler}>
                            <div className='favorite-icon'></div>
                            <div className='favorite-count'>{'0'}</div>
                            <div className='down-icon'></div>
                        </div>
                        <div className='comment-box' onClick={onViewCommentClickHandler}>
                            <div className='comment-icon'></div>
                            <div className='comment-count'>{'0'}</div>
                            <div className='down-icon'></div>
                        </div>
                    </div>
                    <div className='acountbook-box'>{'메모 / 가계부 보기'}</div>
                </div>
                {viewFavorite &&
                <div className='user-favorite-box'>

                </div>
                }
                {viewComment &&
                <div className='user-comments-box'>
                    <div className='user-comments-list-container'>
                        <div className='comments-count-text'>{'댓글 1'}</div>
                        <div className='comments-list-contents'>
                            {commentListMock.map(commentItem => <ItineraryCommentItem commentItem={commentItem} />)}
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}