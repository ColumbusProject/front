import CommentListItem from 'types/interface/comment-list-item.interface'; 
import './style.css';
import dayjs from 'dayjs';

interface Props {
  commentListItem: CommentListItem;
}

export default function CommentItem({commentListItem}: Props) {

  const {profileImage, nickname, writeDatetime, content} = commentListItem;

  //          function: 작성일 경과시간 함수          //
  const getElapsedTime = () => {
    const now = dayjs().add(9, 'hour');
    const writeTime = dayjs(writeDatetime);

    const gap = now.diff(writeTime, 's');
    if (gap < 60) return `${gap}초 전`;
    if (gap < 3600) return `${Math.floor(gap/60)}분 전`;
    if (gap < 86400) return `${Math.floor(gap/3600)}시간 전`;
    return `${Math.floor(gap/86400)}일 전`;
  };
  
  return (
  <div className='box'>
      <div className='box-01-profile-box'>
       <div className='box-01-profile-image' style={{backgroundImage: `url(${profileImage})`}}></div>
        <div className='box-01-01'>
         <div className='box-01-nickname'>{nickname}</div>
         <div className='box-01-divider'>{'|'}</div>
         <div className='box-01-time'>{getElapsedTime()}</div>
        </div>
      </div>
    <div className='box-01-content-box'>
     <div className='box-01-content'>{content}</div>
    </div>
  </div>
    
)
}

