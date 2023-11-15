import { CommentListItem } from 'types';
import './style.css';

interface Props {
    commentItem: CommentListItem;
}

export default function CommentItem({ commentItem }: Props) {

    //          state: Properties          //
    const {profileImage, nickname } = commentItem;
  
    return(

    <div className='profile-box-01'>
        <div className='profile-box-image' style={{backgroundImage: `url(${profileImage /* ? item.profileImage : DefaultProfileImage */})`}}></div>
        <div className='profile-box-nickname'>{nickname}</div>
    </div>

)
}