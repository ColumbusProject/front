import './style.css';
import { useState, useRef, useEffect, ChangeEvent } from 'react';

//          component: 메모/가계부 카드          //
export default function ItineraryMemoAcountBook() {
    const [select, setSelect] = useState<string>('memo');

    //          effect: 메모 메뉴 클릭 이벤트         //
    const onMemoMenuClickHandler = () => {
        setSelect('memo');
    }
    //          effect: 가계부 메뉴 클릭 이벤트         //
    const onAcountBookMenuClickHandler = () => {
        setSelect('acountbook');
    }

    return (
        <div className='memo-acountbook-wrapper'>
            <div className='memo-acountbook-card'>
                <div className='memo-acountbook-close-box'>
                    <div className='memo-acountbook-close-icon'></div>
                </div>
                <div className='memo-acountbook-text-box'>
                    <div className='memo-acountbook-text'>{'메모/가계부 보기'}</div>
                </div>
                {select === 'memo' && (
                    <>
                        <div className='memo-acountbook-divide-box'>
                            <div className='focus-menu'>{'메모'}</div>
                            <div className='out-focus-menu' onClick={onAcountBookMenuClickHandler}>{'가계부'}</div>
                        </div>
                        <div className='memo-text-area-box'>
                            <textarea className='memo-text-area' />
                        </div>
                        <div className='confirm-box'>
                            <div className='confirm-text'>{'확인'}</div>
                        </div>
                    </>
                )}
                {select === 'acountbook' && (
                    <>
                        <div className='memo-acountbook-divide-box'>
                            <div className='out-focus-menu' onClick={onMemoMenuClickHandler}>{'메모'}</div>
                            <div className='focus-menu'>{'가계부'}</div>
                        </div>
                        <div className='acountbook-box'>
                            <div className='total-cost-text-box'>
                                <div className='total-cost-text'>{'여행 총비용'}</div>
                            </div>
                            <div className='cost-type-box'>
                                <div className='krw-box'>
                                    <div className='type-text'>{'KRW'}</div>
                                    <div className='cost-text'>{'0'}</div>
                                </div>
                                <div className='usd-box'>
                                    <div className='type-text'>{'USD'}</div>
                                    <div className='cost-text'>{'0'}</div>
                                </div>
                                <div className='eur-box'>
                                    <div className='type-text'>{'EUR'}</div>
                                    <div className='cost-text'>{'0'}</div>
                                </div>
                            </div>
                            <div className='itinerary-cost-add-box'>
                                <div className='itinerary-cost-text'>{'여행 경비'}</div>
                                <div className='itinerary-cost-add-button'>{'추가'}</div>
                            </div>
                            <div className='add-cost-input-box'>
                                <input className='item-name' />
                                <select className='select-cost-type'>
                                    <option value={"KRW"}>{'KRW'}</option>
                                    <option value={"USD"}>{'USD'}</option>
                                    <option value={"EUR"}>{'EUR'}</option>
                                </select>
                                <input className='cost-text' />
                                <div className='delete-button'>{'삭제'}</div>
                            </div>
                        </div>
                        <div className='confirm-box'>
                            <div className='confirm-text'>{'확인'}</div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}