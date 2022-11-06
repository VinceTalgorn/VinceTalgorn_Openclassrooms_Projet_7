//On importe axios et export tous les modules
import axios from "axios";
export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPADATE_BIO = "UPADATE_BIO";
export const GET_USER_ERROR = "GET_USER_ERROR";

//On vient chercher un utilisateur en fonction de son id
export const getUser = (uid) => {
    return (dispatch) => {
        return fetch(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
            .then((res) => res.json())
            .then((res) => {
                dispatch({
                    type: GET_USER,
                    payload: res,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

//On vient upload une image/vidéo
export const uploadPicture = (data, id) => {
    return (dispatch) => {
        return axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/user/upload`,
            data: data,
            withCredentials: true,
        })
            .then((res) => {
                if (res.data.errors) {
                    dispatch({
                        type: GET_USER_ERROR,
                        payload: res.data.errors,
                    });
                } else {
                    dispatch({ type: GET_USER_ERROR, payload: "" });
                    return axios
                        .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
                        .then((res) => {
                            dispatch({
                                type: UPLOAD_PICTURE,
                                payload: res.data.picture,
                            });
                        });
                }
            })
            .catch((err) => console.log(err));
    };
};

//On vient mettre à jour sa Bio
export const upadateBio = (userId, bio) => {
    return (dispatch) => {
        return fetch(`${process.env.REACT_APP_API_URL}api/user/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                bio: bio,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                dispatch({
                    type: UPADATE_BIO,
                    payload: res.bio,
                });
            })
            .catch((err) => console.log(err));
    };
};
