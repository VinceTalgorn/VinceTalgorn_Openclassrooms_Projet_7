//On vient récupérer l'action sur les tendances
import { GET_TRENDS } from "../actions/post.actions";

const initialState = {};

export default function trendingReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TRENDS:
            return action.payload;
        default:
            return state;
    }
}
