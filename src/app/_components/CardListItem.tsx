import {type CardType} from "../_features/card/cardSlice";
import Link from 'next/link';

interface CardListItemProps {
    data: CardType
}

const CardListItem: React.FunctionComponent<CardListItemProps> = ({data}) => {
    return (
        <article className="outline p-4 mb-4 flex justify-between items-center select-none">
            <h1>{data.name}</h1>
            <Link className="bg-black text-white py-2 px-4 select-none" href={`/card/${data.id}?packId=${data.packId}`}>View</Link>
        </article>
    );
}

export default CardListItem;