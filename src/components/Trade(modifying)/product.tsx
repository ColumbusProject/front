import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import {FaShoppingCart,FaRegBookmark, FaStar, FaFireAlt} from "react-icons/fa";

export function Products(props: { id: Key | null | undefined; image: string | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; totalSales: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; rating: any; timeLeft: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) {
    return(
        <div className='productList'>
            <div key={props.id} className="productCard">
              <img src={props.image} alt='product-img' className='productImage'></img>  
                
                <FaShoppingCart className={"productCard__cart"}/>
                <FaRegBookmark className={"productCard__wishlist"} />
                <FaFireAlt className={"productCard__fastSelling"} />


            <div className='productCard__content'>
                <h3 className='productName'>{props.name}</h3>
                    <div className='displayStack__1'>
                        <div className='productPrice'>{props.totalSales} units sold</div>
                    </div>
                 <div className='displayStack__2'>
                    <div className='productRating'>
                        {[...Array(props.rating)].map((index) => (
                            <FaStar id={index + 1} key={index} />
                        ))}
                    </div>
                        <div className='productTime'>{props.timeLeft} days left</div>
                </div>   
            </div>
        </div>
    </div>
    )
}