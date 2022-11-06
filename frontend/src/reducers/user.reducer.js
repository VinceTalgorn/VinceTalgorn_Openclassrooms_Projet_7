//On vient récupérer toutes les actions par rapport aux utilisateurs
import { GET_USER, UPLOAD_PICTURE, UPADATE_BIO } from "../actions/user.actions";
const initialState = {};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload;
        case UPLOAD_PICTURE:
            return { ...state, picture: action.payload };
        case UPADATE_BIO:
            return { ...state, bio: action.payload };
        default:
            return state;
    }
}
