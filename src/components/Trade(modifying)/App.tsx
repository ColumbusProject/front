import {Products} from './product';
import contents from './Trade';
import { Key, ReactPortal, ReactElement, JSXElementConstructor, ReactNode } from 'react';

export default function App() {
    return(
        <div className='App'>
            {contents.map((contents: { id: Key | null | undefined; image: string | undefined; name: string | number | boolean | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined; price: any; totalSales: string | number | boolean | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined; timeLeft: string | number | boolean | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined; rating: any; }) => (
                <Products
                    key={contents.id}
                    image={contents.image}
                    name={contents.name}
                    price={contents.price}
                    totalSales={contents.totalSales}
                    timeLeft={contents.timeLeft}
                    rating={contents.rating}
                />
            ))}
        </div>
    )
}