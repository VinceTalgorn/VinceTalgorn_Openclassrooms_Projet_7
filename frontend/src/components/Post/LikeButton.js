//On importe les différentes pages et les fonctionnalités de REACT
import React, { useState, useEffect, useContext } from "react";
import { UidContext } from "../AppContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/post.actions";

//création pour like le post
const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const like = () => {
        dispatch(likePost(post._id, uid));
        setLiked(true);
    };

    const unlike = () => {
        dispatch(unlikePost(post._id, uid));
        setLiked(false);
    };

    useEffect(() => {
        if (post.likers.includes(uid)) setLiked(true);
        else setLiked(false);
    }, [uid, post.likers, liked, setLiked]);

    return (
        <div className="like-container">
            {uid === null && (
                <Popup
                    trigger={<img src="./img/icons/heart.svg" alt="like" />}
                    position={["bottom center", "bottom right", "bottom left"]}
                    closeOnDocumentClick
                >
                    <div>Connecter-vous pour aimer un post !</div>
                </Popup>
            )}
            {uid !== null && liked === false && (
                <img src="./img/icons/heart.svg" onClick={like} alt="like" />
            )}
            {uid !== null && liked === true && (
                <img
                    src="./img/icons/heart-filled.svg"
                    onClick={unlike}
                    alt="unlike"
                />
            )}
            <span>{post.likers.length}</span>
        </div>
    );
};

export default LikeButton;
