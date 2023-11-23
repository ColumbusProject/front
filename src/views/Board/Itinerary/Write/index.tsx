import './style.css';
import { useState, useRef, useEffect, ChangeEvent, useCallback } from 'react';
import dayjs from 'dayjs';

declare global {
    interface Window {
    kakao: any
    }
}

//          component: 게시물 작성 화면          //
export default function ItineraryBoardWrite() {

    //          state: 메모/가계부 표시 상태          //
    const [showMemoAcountBook, setShowMemoAcountBook] = useState<boolean>(false);
    //          state: 일정 추가 카드 표시 상태          //
    const [showItineraryAdd, setShowItineraryAdd] = useState<boolean>(false);
    //          state: 여행시작일 상태          //
    const [startDate, setStartDate] = useState<string>('');
    //          state: 여행종료일 상태          //
    const [endDate, setEndDate] = useState<string>('');
    //          state: 여행일 개수 상태          //
    const [schedules, setSchedules] = useState<any[]>([]);
    //          state: 일정카드 표시 슬라이드 상태          //
    const [currentSlide, setCurrentSlide] = useState(0);
    //          state: 일정카드 표시 슬라이드 페이지 길이 상태          //
    const [slideLength, setSlideLength] = useState(0);

    const [selectedList, setSelectedList] = useState<string[]>([]);

    // description: 참고 https://velog.io/@poiu0329/React-%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0feat.-styled-components //

    //          effect: 일정 카드 슬라이드 이펙트           //
    const divRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!divRef.current) return;
        divRef.current.style.marginLeft = `${-currentSlide * 1200}px`;
    }, [currentSlide])

    const isCheckActivePrevbutton = useCallback(() => {
        return currentSlide >= 1
    }, [currentSlide])
    
    const isCheckActiveNextbutton= useCallback(() => {
        return currentSlide < slideLength - 1
    }, [currentSlide, slideLength])

    const prevButtonClick = useCallback(() => {
        if(!isCheckActivePrevbutton()) return;
        setCurrentSlide(prev => prev - 1)
    }, [isCheckActivePrevbutton])
        
    const nextButtonClick = useCallback(() => {
        if (!isCheckActiveNextbutton()) return;
        setCurrentSlide(prev => prev + 1)
    }, [isCheckActiveNextbutton])

    //          event handler: 여행시작일 설정 이벤트         //
    const onStartDateChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setStartDate(value);
    }
    
    //          event handler: 여행종료일 설정 이벤트         //
    const onEndDateChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (!startDate) return;
        const { value } = event.target;

        const startDay = dayjs(startDate);
        const endDay = dayjs(value);

        const result = endDay.diff(startDay, "day", true) + 1;
        const gap = Math.floor(result);

        // description: 일정카드 길이 지정 함수 //
        const slideLength = Math.floor((result - 1)/2);
        setSlideLength(slideLength + 1);

        if (gap > 10) return;
        if (gap < 0) return;

        setEndDate(value);

        let newSchedules: any[] = [];
        
        // if (gap === 0) {
        //     newSchedules.push({})
        //     setSchedules(newSchedules);
        //     return;
        // }

        // todo: 날짜 변경시 날짜 표시 오류 수정
        const different = gap - schedules.length;
        if (different > 0) {
            newSchedules = schedules.map(item => item);
            for (let index = 0; index < different; index++) { 
                const date = startDay.add(index, 'day');
                newSchedules.push({ date: date.format('YYYY.MM.DD') })
            };
        }
        if (different < 0) {
            const lastIndex = schedules.length - 1 + different;
            newSchedules = schedules.filter((item, index) => index <= lastIndex);
        }

        setSchedules(newSchedules);
    }

    //          event handler: 메모/가계부 표시 설정 이벤트         //
    const onMemoAcountBookClickHandler = () => {
        setShowMemoAcountBook(!showMemoAcountBook);
    }

    //          event handler: 메모/가계부 표시 설정 이벤트         //
    const onItineraryAddClickHandler = () => {
        setShowItineraryAdd(!showItineraryAdd);
    }

    const onSelectClickHandler = (place: string) => {
        const newSelectedList = selectedList.map(item => item);
        newSelectedList.push(place)
        setSelectedList(newSelectedList);
    }

    //          component: 카카오맵          //
    const { kakao } = window;
    const Kakaomap = () => {
        useEffect(() => {
            const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
            const options = {
                center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
                level: 3
            };
            const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
        }, [])

        return (
            <div id="map" style={{
                width: '1200px',
                height: '540px'
            }}></div>
        )
    }

    //          component: 일정 추가 카카오맵 API          //
    interface propsType {
        searchKeyword: string
      }

    interface placeType {
    place_name: string,
    road_address_name: string,
    address_name: string,
    phone: string,
    place_url: string
    }

    const Map = (props: propsType) => {
        // 마커를 담는 배열
        let markers: any[] = [];
      
        // 검색어가 바뀔 때마다 재렌더링되도록 useEffect 사용
        useEffect(() => {
          const mapContainer = document.getElementById("map");
          const mapOption = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
          };
      
          // 지도를 생성
          const map = new kakao.maps.Map(mapContainer, mapOption); 
      
          // 장소 검색 객체를 생성
          const ps = new kakao.maps.services.Places();  
      
          // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성
          const infowindow = new kakao.maps.InfoWindow({zIndex:1});
      
          // 키워드로 장소를 검색합니다
          searchPlaces();
      
          // 키워드 검색을 요청하는 함수
          function searchPlaces() {
            let keyword = props.searchKeyword;
      
            if (!keyword.replace(/^\s+|\s+$/g, "")) {
              console.log("키워드를 입력해주세요!");
              return false;
            }
      
            // 장소검색 객체를 통해 키워드로 장소검색을 요청
            ps.keywordSearch(keyword, placesSearchCB);
          }
      
          // 장소검색이 완료됐을 때 호출되는 콜백함수
          function placesSearchCB(data: any, status: any, pagination: any) {
            if (status === kakao.maps.services.Status.OK) {
              // 정상적으로 검색이 완료됐으면
              // 검색 목록과 마커를 표출
              displayPlaces(data);
      
              // 페이지 번호를 표출
              displayPagination(pagination);
      
            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
              alert('검색 결과가 존재하지 않습니다.');
              return;
            } else if (status === kakao.maps.services.Status.ERROR) {
              alert('검색 결과 중 오류가 발생했습니다.');
              return;
            }
          }
      
          // 검색 결과 목록과 마커를 표출하는 함수
          function displayPlaces(places: string | any[]) {
            const listEl = document.getElementById('places-list'), 
                  resultEl = document.getElementById('search-result'),
                  fragment = document.createDocumentFragment(), 
                  bounds = new kakao.maps.LatLngBounds();
      
            // 검색 결과 목록에 추가된 항목들을 제거
            listEl && removeAllChildNods(listEl);
      
            // 지도에 표시되고 있는 마커를 제거
            removeMarker();
      
            for ( var i=0; i<places.length; i++ ) {
              // 마커를 생성하고 지도에 표시
              let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                  marker = addMarker(placePosition, i, undefined), 
                  itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성
      
              // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
              // LatLngBounds 객체에 좌표를 추가
              bounds.extend(placePosition);
      
              // 마커와 검색결과 항목에 mouseover 했을때
              // 해당 장소에 인포윈도우에 장소명을 표시
              // mouseout 했을 때는 인포윈도우를 닫기
              (function(marker, title) {
                kakao.maps.event.addListener(marker, 'mouseover', function() {
                  displayInfowindow(marker, title);
                });
      
                kakao.maps.event.addListener(marker, 'mouseout', function() {
                  infowindow.close();
                });
      
                itemEl.onmouseover =  function () {
                  displayInfowindow(marker, title);
                };
      
                itemEl.onmouseout =  function () {
                  infowindow.close();
                };
              })(marker, places[i].place_name);
      
              fragment.appendChild(itemEl);
            }
      
            // 검색결과 항목들을 검색결과 목록 Element에 추가
            listEl && listEl.appendChild(fragment);
            if (resultEl) {
              resultEl.scrollTop = 0;
            }
      
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정
            map.setBounds(bounds);
          }
      
          // 검색결과 항목을 Element로 반환하는 함수
          function getListItem(index: number, places: placeType) {
      
            const el = document.createElement('li');
            let itemStr = `
                <div class="info">
                  <span class="marker marker_${index+1}">
                    ${index+1}
                  </span>
                  <a href="${places.place_url}">
                    <h5 class="info-item place-name">${places.place_name}</h5>
                    ${
                      places.road_address_name 
                      ? `<span class="info-item road-address-name">
                          ${places.road_address_name}
                         </span>
                         <span class="info-item address-name">
                            ${places.address_name}
                            </span>`
                      : `<span class="info-item address-name">
                            ${places.address_name}
                        </span>`
                    }
                    <span class="info-item tel">
                      ${places.phone}
                    </span>
                  </a>
                  <button onclick='onSelectClickHandler(${places.place_name})'>선택</button>
                </div>
                `;
      
            el.innerHTML = itemStr;
            el.className = 'item';
      
            return el;
          }
      
          // 마커를 생성하고 지도 위에 마커를 표시하는 함수
          function addMarker(position: any, idx: number, title: undefined) {
            var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지
                imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
                imgOptions =  {
                  spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                  spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                  offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
                },
                markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                marker = new kakao.maps.Marker({
                  position: position, // 마커의 위치
                  image: markerImage 
                });
      
            marker.setMap(map); // 지도 위에 마커를 표출
            markers.push(marker);  // 배열에 생성된 마커를 추가
      
            return marker;
          }
      
          // 지도 위에 표시되고 있는 마커를 모두 제거합니다
          function removeMarker() {
            for ( var i = 0; i < markers.length; i++ ) {
              markers[i].setMap(null);
            }
            markers = [];
          }
      
          // 검색결과 목록 하단에 페이지번호를 표시는 함수
          function displayPagination(pagination: { last: number; current: number; gotoPage: (arg0: number) => void }) {
            const paginationEl = document.getElementById('pagination') as HTMLElement;
            let fragment = document.createDocumentFragment();
            let i; 
      
            // 기존에 추가된 페이지번호를 삭제
            while (paginationEl.hasChildNodes()) {
              paginationEl.lastChild &&
                paginationEl.removeChild(paginationEl.lastChild);
            }
      
            for (i=1; i<=pagination.last; i++) {
              const el = document.createElement('a') as HTMLAnchorElement;
              el.href = "#";
              el.innerHTML = i.toString();
      
              if (i===pagination.current) {
                el.className = 'on';
              } else {
                el.onclick = (function(i) {
                  return function() {
                    pagination.gotoPage(i);
                  }
                })(i);
              }
      
              fragment.appendChild(el);
            }
            paginationEl.appendChild(fragment);
          }
      
          // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수
          // 인포윈도우에 장소명을 표시
          function displayInfowindow(marker: any, title: string) {
            const content = '<div style="padding:5px;z-index:1;" class="marker-title">' + title + '</div>';
      
            infowindow.setContent(content);
            infowindow.open(map, marker);
          }
      
          // 검색결과 목록의 자식 Element를 제거하는 함수
          function removeAllChildNods(el: HTMLElement) {
            while (el.hasChildNodes()) {
              el.lastChild &&
                el.removeChild (el.lastChild);
            }
          }
      
        }, [props.searchKeyword])
      
        return (
          <div className="map-container">
            <div id="map" className="map" style={{width: '960px', height: '600px', marginBottom: '60px'}}></div>
            <div id="search-result">
              {/* <p className="result-text">
                <span className="result-keyword">
                  { props.searchKeyword }
                </span>
                검색 결과
              </p> */}
              <div className="scroll-wrapper">
                <ul id="places-list"></ul>
              </div>
              <div id="pagination"></div>
            </div>
          </div>
        )
      }

    //          component: 일정 추가 카드           //
    const ItineraryAdd = () => {

    //          state: 검색 키워드 상태           //
    const [keyword, setKeyword] = useState<string>("");
    
    const [value, setValue] = useState<string>("");

    //          event handler: 검색 버튼 클릭 이벤트          //
    const onSetKeywordClickHandler = () => {
        setKeyword(value);
    }

    const keywordChange = (e: { preventDefault: () => void; target: { value: string }; }) => {
        e.preventDefault();
        setValue(e.target.value);
    }

        return(
            <div className='itinerary-add-warpper'>
                <div className='itinerary-add-card'>
                    <div className='day-select-close-box'>
                        <div className='day-select-box'>
                            <select className='day-select'>
                                {schedules.map((item, index) => <option>{'DAY '}{index + 1}{' ('}{item.date}{')'}</option>)}
                            </select>
                        </div>
                        <div className='close-box' onClick={onItineraryAddClickHandler}></div>
                    </div>
                    <div className='location-search-box'>
                        <input className='loaction-input' onChange={ keywordChange } placeholder='가고 싶은 장소를 검색해 보세요' />
                        <div className='search-button' onClick={ onSetKeywordClickHandler }></div>
                    </div>
                    {selectedList.map(item => item)}
                    <div className='kakao-map-box'><Map searchKeyword={ keyword }  /></div>
                    <div className='search-result-box'>
                        <div className='search-result'></div>
                    </div>
                </div>
            </div>
        )
    }

    //          component: 일정 관리 카드          //
    const ItineraryCard = ({ item, index }: { item: any, index: number }) => {

        return ( 
            <div className='itinerary-card-wrapper'>
                <div className='day-count-box'>
                    <div className='day-count-text'>{`DAY ${index + 1}`}</div>
                    <div className='day-text'>{item.date}</div>
                </div>
                <div className='itinerary-text-box'>
                    <div className='itinerary-add-text' onClick={onItineraryAddClickHandler}>{'+ 일정 추가'}</div>
                </div>
            </div>
        )
    }

    //          component: 메모/가계부 카드          //
    const ItineraryMemoAcountBook = () => {
        const [select, setSelect] = useState<string>('memo');

        //          event handler: 메모 메뉴 클릭 이벤트         //
        const onMemoMenuClickHandler = () => {
            setSelect('memo');
        }
        //          event handler: 가계부 메뉴 클릭 이벤트         //
        const onAcountBookMenuClickHandler = () => {
            setSelect('acountbook');
        }

        return (
            <div className='memo-acountbook-wrapper'>
                {select === 'memo' && (
                        <div className='memo-card'>
                            <div className='memo-acountbook-close-box' onClick={onMemoAcountBookClickHandler}>
                                <div className='memo-acountbook-close-icon'></div>
                            </div>
                            <div className='memo-acountbook-text-box'>
                                <div className='memo-acountbook-text'>{'메모/가계부 보기'}</div>
                            </div>
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
                        </div>
                )}
                {select === 'acountbook' && (
                        <div className='acountbook-card'>
                            <div className='memo-acountbook-close-box' onClick={onMemoAcountBookClickHandler}>
                                <div className='memo-acountbook-close-icon'></div>
                            </div>
                            <div className='memo-acountbook-text-box'>
                                <div className='memo-acountbook-text'>{'메모/가계부 보기'}</div>
                            </div>
                            <div className='memo-acountbook-divide-box'>
                                <div className='out-focus-menu' onClick={onMemoMenuClickHandler}>{'메모'}</div>
                                <div className='focus-menu'>{'가계부'}</div>
                            </div>
                            <div className='acountbook-box'>
                                <div className='total-cost-text-box'>
                                    <div className='total-cost-text'>{'여행 총비용'}</div>
                                </div>
                                <div className='cost-type-box'>
                                    <div className='money-box'>
                                        <div className='type-text'>{'KRW'}</div>
                                        <div className='cost-text'>{'0'}</div>
                                    </div>
                                    <div className='money-box'>
                                        <div className='type-text'>{'USD'}</div>
                                        <div className='cost-text'>{'0'}</div>
                                    </div>
                                    <div className='money-box'>
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
                                    <input className='cost-input' />
                                    <div className='delete-button'>{'삭제'}</div>
                                </div>
                            </div>
                            <div className='confirm-box'>
                                <div className='confirm-text'>{'확인'}</div>
                            </div>
                        </div>
                )}
            </div>
        )
    }

    //          render: 게시물 작성 화면 렌더링          //
    return (
        <div className='board-write-wrapper'>
            <div className='board-write-container'>
                <div className='board-write-box'>
                    <div className='board-write-title-box'>
                        <input className='board-write-title-input' type='text' placeholder='일정 제목' />
                    </div>
                    <div className='board-write-calendar-notepad-box'>
                        <div className='board-write-calendar-start-text'>{'여행 시작일'}</div>
                        <div className='board-write-calendar-start-input-box'>
                            <input className='board-write-calendar-input' type='date' value={startDate} onChange={onStartDateChangeHandler} />
                        </div>
                        <div className='board-write-calendar-end-text'>{'여행 종료일'}</div>
                        <div className='board-write-calendar-end-input-box'>
                            <input className='board-write-calendar-input' type='date' value={endDate} onChange={onEndDateChangeHandler} />
                        </div>
                        <div className='board-write-calendar-limit-day-text'>{'최대 여행 일수 : 10일 제한'}</div>
                        <div className='board-write-notepad-accountbook-text' onClick={onMemoAcountBookClickHandler}>{'메모 / 가계부 보기'}</div>
                    </div>
                </div>
                <div className='kakaomap-box'>
                { !showItineraryAdd && <Kakaomap /> }
                </div>
                <div className='itinerary-card-container'>
                    <div className='left-arrow-icon' onClick={prevButtonClick}>{'<'}</div>
                    <div className='itinerary-card-slide-container'>
                        <div ref={divRef} className='itinerary-card-box'>
                            {schedules.map((item, index) => <ItineraryCard item={item} index={index} />)}
                        </div>
                    </div>
                    <div className='right-arrow-icon' onClick={nextButtonClick}>{'>'}</div>
                </div>
                <div className='save-cancel-box'>
                    <div className='save-text'>{'저장'}</div>
                    <div className='cancel-text'>{'취소'}</div>
                </div>
            </div>
            { showItineraryAdd && <ItineraryAdd /> }
            { showMemoAcountBook && <ItineraryMemoAcountBook /> }
        </div>
    )
}