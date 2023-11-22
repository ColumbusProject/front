import styles from './Title.style.module.css'
import { sampleData } from '../../../mock/sampleData'
import { ReactNode, useState } from 'react';


function Title() {
  const [search, setSearch] = useState('')
  console.log(search)

function item
      (value: { id: string; Product: string; "Currency type": string; Country: string; City: string; State: null; Hashtag: string } | { Product: string; "Currency type": string; Country: string; City: string; State: string; Hashtag: string }, index: number, array: ({ Product: string; "Currency type": string; Country: string; City: string; State: null; Hashtag: string } | { Product: string; "Currency type": string; Country: string; City: string; State: string; Hashtag: string })[]): ReactNode {
    throw new Error('Function not implemented.')
  }

  return (
    <>

    {/* Title  */}
      <div className={styles.Title}>자유 거래 게시판</div>

    {/*검색 이벤트*/}
     
      <div className='SearchForm'>
        <div className= 'InputGroup'>
      <input className={styles.searchBar}/>
      <button className={styles.searchBtn}/>
       <div onChange={(e) => setSearch(e.target.value)}/>
      
       </div>
      </div>


    {/* 검색 컴포넌트 */}

    <div className='Table'>
      <thead>
          <th>Product</th>
          <th>Currency type</th>
          <th>Country</th>
          <th>City</th>
          <th>State</th>
          <th>Hashtag</th>
      </thead>
    <tbody>
    {sampleData.filter((item)) => {
       return search.toLowerCase() === '' 
       ? item 
       : item.Product.toLowerCase().includes(search);
       
    })
    .map((item) => (
      <tr key={item.City}>
        <td>{item.Product}</td>
        <td>{item["Currency type"]}</td>
        <td>{item.Country}</td>
        <td>{item.City}</td>
        <td>{item.State}</td>
        <td>{item.Hashtag}</td>
      </tr>

    ))}

    {/* 아이템 등록 버튼  */}
    <button className={styles.itemEnroll}>아이템 등록</button>

    {/* 가로선 */}
    <div className={styles.divider}></div>
    </tbody>
    </div>
    </>
  )
    }


    export default Title
