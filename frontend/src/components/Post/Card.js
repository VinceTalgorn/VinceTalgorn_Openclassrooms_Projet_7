//On importe les différentes pages et les fonctionnalités de REACT
import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dateParser, isEmpty } from "../Utils";
import LikeButton from "./LikeButton";
import { updatePost } from "../../actions/post.actions";
import { UidContext } from "../AppContext";
import DeleteCard from "./DeleteCard";
import CardComments from "./CardComments";

//Création de la card pour le post
const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const uid = useContext(UidContext);
    const [showComments, setShowComments] = useState(false);

    const updateItem = () => {
        if (textUpdate) {
            dispatch(updatePost(post._id, textUpdate, uid));
        }
        setIsUpdated(false);
    };

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData]);

    return (
        <li className="card-container" key={post._id}>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                <>
                    <div className="card-left">
                        <img
                            src={
                                !isEmpty(usersData[0]) &&
                                usersData
                                    .map((user) => {
                                        if (user._id === post.userId)
                                            return user.picture;
                                        else return null;
                                    })
                                    .join("")
                            }
                            alt="poster-pic"
                        />
                    </div>
                    <div className="card-right">
                        <div className="card-header">
                            <div className="pseudo">
                                <h3>
                                    {!isEmpty(usersData[0]) &&
                                        usersData.map((user) => {
                                            if (user._id === post.userId)
                                                return user.pseudo;
                                            else return null;
                                        })}
                                </h3>
                            </div>
                            <span>{dateParser(post.createdAt)}</span>
                        </div>
                        {isUpdated === false && <p>{post.message}</p>}
                        {isUpdated === true && (
                            <div className="upadate-post">
                                <textarea
                                    defaultValue={post.message}
                                    onChange={(e) =>
                                        setTextUpdate(e.target.value)
                                    }
                                />
                                <div className="button-container">
                                    <button
                                        className="btn"
                                        onClick={updateItem}
                                    >
                                        Valider modifications
                                    </button>
                                </div>
                            </div>
                        )}
                        {post.picture && (
                            <img
                                src={post.picture}
                                alt="card-pic"
                                className="card-pic"
                            />
                        )}
                        {post.video && (
                            <iframe
                                width="500"
                                height="300"
                                src={post.video}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encypted-media; gyroscope; picture-in-picture"
                                allowFullScreen={true}
                                webkitallowfullscreen="true"
                                mozallowfullscreen="true"
                                title="video"
                            ></iframe>
                        )}
                        {(userData.admin === true ||
                            userData._id === post.userId) && (
                            <div className="button-container">
                                <div onClick={() => setIsUpdated(!isUpdated)}>
                                    <img
                                        src="./img/icons/edit.svg"
                                        alt="edit"
                                    />
                                </div>
                                <DeleteCard id={post._id} />
                            </div>
                        )}
                        <div className="card-footer">
                            <div className="comment-icon">
                                <img
                                    onClick={() =>
                                        setShowComments(!showComments)
                                    }
                                    src="/img/icons/message1.svg"
                                    alt="comment"
                                />
                                <span>{post.comments.length}</span>
                            </div>
                            <LikeButton post={post} />
                            <img src="./img/icons/share.svg" alt="share" />
                        </div>
                        {showComments && <CardComments post={post} />}
                    </div>
                </>
            )}
        </li>
    );
};

export default Card;
