import { createSelector} from 'reselect';
import { useSelector } from 'react-redux';

const aSort = createSelector(
    (state) => state.breeds,
    (breeds) => breeds.sort((a,b) => a.name - b.name)
)
export const asSort = () =>{
    const ascSort = useSelector(aSort)
}