import {type PackType} from '../_features/pack/packSlice';
import Link from 'next/link';

interface PacksListItemProps {
    data: PackType
}

const PacksListItem: React.FunctionComponent<PacksListItemProps> = ({data}) => {
    return (
        <article className="flex justify-between items-center outline p-4 mb-4">
            <h1 className="select-none">{data.name}</h1>
            <Link className="bg-black text-white py-2 px-4 select-none" href={`/pack/${data.id}`}>View</Link>
        </article>
    );
}

export default PacksListItem;