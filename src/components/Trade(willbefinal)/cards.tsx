import React from "react"
import './cards.css';
import { TradeListItem } from 'type/interface';

interface Props {
    TradeItemList: TradeListItem
}

//       component: products cards layout      //
export default function cards({ TradeListItem }: Props {

 
//                 properties                  //
const { boardNumber, title, itemType} = TradeItemList;
const { tradeImage, writeDateTime, location} = TradeItemList;
const { currencyType, viewCount, price, bookmark} = TradeItemList;


//            render: Board List Item         //
return (
<>
{/* divider */}
   <div className="divider"></div>
    
{/* item cards  */}
    <div className="container">
      <div className="cards">
        <div className="card">
          <div className="minicard">
            <button onClick={bookmark}>bookmark</button>
            
          </div>
          <div className="title">{title}</div>
          <div className="content">소진공주 소진공주 소진공주 소진공주 소진공주 소진공주 최고의 미모 최고의 미모 최고의 미모
            최고의 미모 최고의 미모 최고의 미모
          </div>
        </div>
</>

}
