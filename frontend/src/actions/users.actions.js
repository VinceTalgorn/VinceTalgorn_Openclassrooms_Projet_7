//On importe le module axios
import axios from "axios";

//On vient chercher tous les users dans l'API
export const GET_USERS = "GET_USERS";

export const getUsers = () => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/user`)
            .then((res) => {
                dispatch({ type: GET_USERS, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};
