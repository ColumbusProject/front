import React from "react";
import { TradeListItem } from "types";

//          interface: Props          //
interface Props extends TradeListItem {

}
//          component: Card 상자 컴포넌트         //
const Card = (props: Props) => {

  //                state: properties            //
  const { boardNumber, title, itemType} = props;
  const { tradeImage, writeDatetime, location} = props;
  const { currencyType, viewCount, price, bookMark} = props;

  //          event handler: 북마크 클릭 이벤트 처리          //
  const onBookMarkClick = () => {

  }

  //          render: Card 상자 렌더링          //
  return (
    <div className="container">
      <div className="cards">
        <div className="card">
          <div className="minicard">
            <button onClick={onBookMarkClick}>bookmark</button>
            <div className="title">{title}</div>
            <div className="content"> </div>
          </div>
        </div>
      </div>
    </div>
  )};

export default Card;