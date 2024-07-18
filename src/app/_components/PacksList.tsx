import {type PackType} from "../_features/pack/packSlice";
import PacksListItem from "./PacksListItem";

interface PacksListProps {
    data: PackType[]
}

const PacksList: React.FunctionComponent<PacksListProps> = ({data}) => {
    return (
        <section>
            {!data.length && (
                <h1 className="text-center text-2xl font-bold">No Packs Found...</h1>
            )}
            {data.map(item => {
                return (
                    <PacksListItem key={item.id} data={item}/>
                );
            })}
        </section>
    );
}

export default PacksList;