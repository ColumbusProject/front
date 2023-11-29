import { useNavigate } from "react-router-dom";
import { BOARD_REVIEW_DETAIL_PATH } from "../../constant";
import { ReviewBoardListItem } from "types"; 
import defaultProfileImage from "assets/default-profile-image.png";
import './style.css';

//          interface: 게시물 리스트 아이템 컴포넌트 Props          //
interface Props {
    boardItem: ReviewBoardListItem
}

export default function ReviewBoardItem({boardItem}: Props) {
    const {boardNumber, title, content, boardTitleImage, favoriteCount, commentCount, viewCount, writeDatetime, writerNickname,
    writerProfileImage, location} = boardItem;

    const navigator = useNavigate();

    const onCardClickHandler = () => {
        navigator(BOARD_REVIEW_DETAIL_PATH(boardNumber));
    }

    return (
        <div className="board-list-item-card" onClick={onCardClickHandler}>
            <div className="board-list-item-card-title-box">
                <div className="board-list-item-card-title-box-01">
                    <div className="board-list-item-card-title-box-01-title">{title}</div>
                </div>
                <div className="board-list-item-card-title-box-02">
                    <div className="board-list-item-card-title-box-02-location"></div>
                    <div className="board-list-item-card-title-box-02-text">{location}</div>
                    <div className="board-list-item-card-title-box-02-profile-image" style={{backgroundImage: `url(${writerProfileImage ? writerProfileImage : defaultProfileImage})`}}></div>
                    <div className="board-list-tiem-card-title-box-02-box">
                        <div className="nickname-datetime">{`${writerNickname} | ${writeDatetime}`}</div>
                    </div>
                    <div className="board-list-item-card-title-box-02-view-count">{`조회수 ${viewCount}`}</div>
                    <div className="board-list-item-card-title-box-02-favorite-count"></div>
                </div>
            </div>
            <div className="divider"></div>
            <div className="board-list-item-card-content-box">
                <div className="board-list-item-card-content-box-content">{content}</div>
                <div className="board-list-item-card-content-box-content-image" style={{backgroundImage: `url(${boardTitleImage})`}}></div>
            </div>
        </div>
    )
}
