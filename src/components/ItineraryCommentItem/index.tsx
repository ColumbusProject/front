import { CommentListItem } from 'types';
import './style.css';
import DefaultProfileImage from 'assets/default-profile-image.png';

//          interface: 댓글 리스트 아이템 컴포넌트 Props          //
interface Props {
    commentItem: CommentListItem
}

export default function ItineraryCommentItem({commentItem}: Props) {

    const { content, writeDatetime, nickname, profileImage } = commentItem;

    //          render: 댓글 리스트 아이템 컴포넌트 렌더링          //
    return(
        <div className='comment-list-item-box'>
            <div className='comment-list-item-top'>
                <div className='comment-list-item-profile-box'>
                    <div className='comment-list-item-profile-image' style={{ backgroundImage: `url(${profileImage ? profileImage : DefaultProfileImage})`}}></div>
                </div>
                <div className='comment-list-item-nickname'>{nickname}</div>
                <div className='comment-list-item-divider'>{'\|'}</div>
                <div className='comment-list-item-time'>{writeDatetime}</div>
            </div>
            <div className='comment-list-item-main'>
                <div className='comment-list-item-contents'>{content}</div>
            </div>
        </div>
    )
}