import React, { useState, useRef, ChangeEvent, useEffect } from 'react'
import './style.css';
import { useBoardStore, useLoginUserStore } from 'stores';
import { useNavigate } from 'react-router-dom';
import { MAIN_PATH } from 'constant';

export default function Write() {
  const [show, setShow] = useState<boolean>(false);

  //          state: 제목 영역 요소 참조 상태          //
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  //          state: 이미지 인풋 ref상태          //
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  //          state: 본문 텍스트 영역 ref 상태          //
  const contentsTextAreaRef = useRef<HTMLTextAreaElement | null>(null);
  //          state: 장소 영역 요소 참조 상태          //
  const locationRef = useRef<HTMLInputElement | null>(null);
  //          state: 게시물 상태          //
  const {title, setTitle} = useBoardStore();
  const {contents, setContents} = useBoardStore();
  const {images, setImages} = useBoardStore();
  const {location, setLocation, resetBoard} = useBoardStore();
  //          state: 게시물 이미지 url 상태          //
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  //          state: 로그인 유저 상태          //
  const { loginUser } = useLoginUserStore();

  //          function: 네비게이트 함수           //
  const navigator = useNavigate();

  //          event handler: 제목 변경 이벤트 처리          //
  const onTitleChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const title = event.target.value;
    setTitle(title);
    if (!titleRef.current) return;
    titleRef.current.style.height = 'auto';
    titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
  }
  //          event handler: 내용 변경 이벤트 처리          //
  const onContentsChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const contents = event.target.value;
    setContents(contents);
    if (!contentsTextAreaRef.current) return;
    contentsTextAreaRef.current.style.height = 'auto';
    contentsTextAreaRef.current.style.height = `${contentsTextAreaRef.current.scrollHeight}px`;
  }
  //          event handler: 이미지 변경 이벤트 처리          //
  const onImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) return;
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    const newImageUrls = imageUrls.map(url => url); 
    newImageUrls.push(imageUrl);
    const newImages = images.map(image => image);
    newImages.push(file);

    setImageUrls(newImageUrls);
    setImages(newImages);

    if (!imageInputRef.current) return;
    imageInputRef.current.value = '';
  }
  //          event handler: 장소 변경 이벤트 처리          //
  const onLocationChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const location = event.target.value;
    setLocation(location);
    if (!locationRef.current) return;
    locationRef.current.style.width = `80px`;
    locationRef.current.style.width = `${locationRef.current.scrollWidth}px`;
  }

  //          event handler: 이미지 업로드 버튼 클릭 이벤트 처리          //
  const onImageUploadButtonClickHandler = () => {
    if (!imageInputRef.current) return;
    imageInputRef.current.click();
  }

  //          event handler: 이미지 닫기 버튼 클릭 이벤트 처리          //
  const onImageCloseButtonClickHandler = (deleteIndex: number) => {
    if (!imageInputRef.current) return;
    imageInputRef.current.value = '';

    const newImageUrls = imageUrls.filter((url, index) => index !== deleteIndex);
    setImageUrls(newImageUrls);
    const newImages = images.filter((image, index) => index !== deleteIndex);
    setImages(newImages);
  }

  //          event handler: 장소 버튼 클릭 이벤트 처리          //
  const onButtonClickHandler = () => {
    setShow(!show);
    console.log(show);
  };

  //          event handler: 저장 버튼 클릭 이벤트 처리 함수          //
  const saveButtonClickHandler = () => {

  }

  //          effect: 마운트 시 실행할 함수          //
  useEffect(() => {
    if (!loginUser) {
      navigator(MAIN_PATH());
      return;
    }
    resetBoard();
  }, []);

  return (
    <div className='board-write-page'>
        <div className='board-write-page-inside'>
            <div className='board-write-page-title-box'>
              <textarea ref={titleRef} className='board-write-page-title' placeholder='제목을 작성해 주세요.' value={title} onChange={onTitleChangeHandler}/>
            </div>
            <div className='divider'></div>
            <div className='board-write-page-container'>
              <div className='board-write-page-icon-box'>
                {show &&
                  <div className='board-write-page-location-box-container'>
                    <div className='board-write-page-location-icon'></div>
                    <input ref={locationRef} className='board-write-page-location-text' type='text' value={location} onChange={onLocationChangeHandler} />
                    {/* <div className='board-write-page-location-close'></div> */}
                  </div>
                }
                <div className='board-write-page-location' onClick={onButtonClickHandler}></div>
                <input ref={imageInputRef} type='file' accept='image/*' style={{display: 'none'}} onChange={onImageChangeHandler} />
                <div className='board-write-page-image' onClick={onImageUploadButtonClickHandler}></div>
              </div>
              <div className='board-write-page-content-box'>
                <textarea ref={contentsTextAreaRef} className='board-write-page-content' placeholder='본문을 작성해주세요.' spellCheck={false} value={contents} onChange={onContentsChangeHandler} />
                <div className='board-write-page-images-box'>
                  {imageUrls.map((imageUrl, index) => (
                    <div className='board-write-page-image-box'>
                      <div className='close-button-icon' onClick={() => onImageCloseButtonClickHandler(index)}></div>
                      <img className='board-write-page-image-01' src={imageUrl} />
                    </div>
                  ))}
                </div>
              </div>
              <div className='board-write-page-container-save' onClick={saveButtonClickHandler}>{'저장'}</div>
              <div className='board-write-page-container-cancel'>{'취소'}</div>
            </div>
        </div>
    </div>
  )
}
