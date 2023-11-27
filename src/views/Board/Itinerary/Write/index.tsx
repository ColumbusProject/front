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

    interface PlaceType {
    place_name: string,
    road_address_name: string,
    address_name: string,
    phone: string,
    place_url: string
    }

    const Map = (props: propsType) => {

      const mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
      };

      const mapRef = useRef<HTMLDivElement | null>(null);
      const searchResultRef = useRef<HTMLDivElement | null>(null);

      // 마커를 담는 배열
      const [markers, setMarkers] = useState<any[]>([]);
      // 검색 결과 리스트
      const [resultPlaces, setResultPlaces] = useState<any[]>([]);
      // 페이지 리스트
      const [pageList, setPageList] = useState<number[]>([]);
      // 현재 페이지
      const [currentPage, setCurrentPage] = useState<number>(1);

      const [gotoPage, setGotoPage] = useState<(page: number) => void>();

      // 페이지 이동 함수
      // let gotoPage: (page: number) => void = (page: number) => {};

      const onPageClickHandler = (page: number) => {
        if (page === currentPage) return;
        // gotoPage(page);
      }

      // component: 지도 검색 결과 아이템 컴포넌트  //
      const SearchResultItem = ({index, place}: {index: number, place: PlaceType}) => {

        return (
          <div className="info-divider">
                <span className={`marker marker_${index+1}`}>{/*index+1*/}</span>
                <a className='info-item' href={place.place_url}>
                  <div className="place-name">{place.place_name}</div>
                  {/* {
                    place.road_address_name 
                    ? 
                      <>
                      <span className="info-item road-address-name">
                        {place.road_address_name}
                      </span>
                      <span className="info-item address-name">
                        {place.address_name}
                      </span>
                      </>
                    : <span className="info-item address-name">
                          {place.address_name}
                      </span>
                  } */}
                  <span className="address-name">{place.address_name}</span>
                  {/* <span className="info-item tel">{place.phone}</span> */}
                </a>
                <div className='place-select-button-box'>
                  <button className='place-select-button' onClick={() => onSelectClickHandler(place.place_name)}>선택</button>
                </div>  
          </div>
        )

      }
      
        // 검색어가 바뀔 때마다 재렌더링되도록 useEffect 사용
      useEffect(() => {
        const mapContainer = document.getElementById("map")
        const map = new kakao.maps.Map(mapContainer, mapOption);
        const places = new kakao.maps.services.Places();  
        const infowindow = new kakao.maps.InfoWindow({zIndex:1});
        const keyword = props.searchKeyword;

        if (!keyword.replace(/^\s+|\s+$/g, "")) {
          console.log("키워드를 입력해주세요!");
          return;
        }

        const placesSearchCB = (data: any, status: any, pagination: any) => {
          if (status === kakao.maps.services.Status.OK) {
            setResultPlaces(data);
            displayPlaces(data);
            // displayPagination(pagination);
          } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
            return;
          } else if (status === kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
            return;
          }
        }
    
        places.keywordSearch(keyword, placesSearchCB);
    
        const displayPlaces = (places: any[]) => {
          const bounds = new kakao.maps.LatLngBounds();
    
          removeMarker();

          const setMarkers = (element: any, index: number) => {
            const placePosition = new kakao.maps.LatLng(element.y, element.x);
            const marker = addMarker(placePosition, index, undefined);

            bounds.extend(placePosition);

            (function(marker, title) {
              kakao.maps.event.addListener(marker, 'mouseover', function() {
                displayInfowindow(marker, title);
              });
    
              kakao.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close();
              });
            })(marker, element.place_name);
          }

          places.forEach(setMarkers);
    
          if (searchResultRef.current) searchResultRef.current.scrollTop = 0;
    
          map.setBounds(bounds);
        }
    
        function addMarker(position: any, idx: number, title: undefined) {
          const markerImageUrl = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
          const markerImageSize = new kakao.maps.Size(36, 37);
          const markerImageOptions =  {
                spriteSize : new kakao.maps.Size(36, 691),
                spriteOrigin : new kakao.maps.Point(0, (idx*46)+10),
                offset: new kakao.maps.Point(13, 37)
          }
          const markerImage = new kakao.maps.MarkerImage(markerImageUrl, markerImageSize, markerImageOptions);
          const marker = new kakao.maps.Marker({
            position: position,
            image: markerImage 
          });
    
          marker.setMap(map);

          const newMarkers = markers.map(item => item);
          newMarkers.push(marker);
    
          return marker;
        }
    
        function removeMarker() {
          markers.forEach(marker => marker.setMap(null));
          setMarkers([]);
        }
    
        function displayPagination(pagination: { last: number; current: number; gotoPage: (arg0: number) => void }) {
         
          setCurrentPage(pagination.current);
          const newPageList: number[] = [];
          for (let index = 1; index <= pagination.last; index++) newPageList.push(index);
          setPageList(newPageList);

          console.log(pagination.gotoPage);
          setGotoPage(pagination.gotoPage);
  
        }
    
        function displayInfowindow(marker: any, title: string) {
          const content = '<div style="padding:5px;z-index:1;" class="marker-title">' + title + '</div>';
    
          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
    
      }, [props.searchKeyword]);

      return (
        <div className="map-container">
          <div ref={mapRef} id="map" className="map" style={{width: '960px', height: '600px', marginBottom: '60px'}}></div>
          <div ref={searchResultRef} id="search-result">
            <div className="scroll-wrapper">
              <div id="places-list">
                {resultPlaces.map((item, index) => <SearchResultItem index={index} place ={item} />)}
              </div>
            </div>
            {/* <div id="pagination">
              {pageList.map((page) => (
                <a 
                  href='#' 
                  className={page === currentPage ? 'on': ''}
                  onClick={() => onPageClickHandler(page)}>
                  {page}
                </a>
              ))}
              
            </div> */}
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