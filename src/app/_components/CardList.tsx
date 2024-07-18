import {type CardType} from "../_features/card/cardSlice";
import CardListItem from './CardListItem';

interface CardListProps {
    data: CardType[]
}

const CardList: React.FunctionComponent<CardListProps> = ({data}) => {
    return (
        <section>
            {!data.length && (
                <h1 className="text-2xl font-bold text-center">No Cards Found...</h1>
            )}
            {data.map(item => {
                return (
                    <CardListItem key={item.id} data={item}/>
                );
            })}
        </section>
    );
}

export default CardList;