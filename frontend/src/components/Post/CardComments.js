//On importe les différentes pages et les fonctionnalités de REACT
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty, timestampParser } from "../Utils";
import { addComment, getPosts } from "../../actions/post.actions";
import EditDeleteComment from "./EditDeleteComment";

//Création de la card pour les commentaires des posts
const CardComments = ({ post }) => {
    const [text, setText] = useState("");
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handelComment = (e, uid) => {
        e.preventDefault();
        if (text) {
            dispatch(
                addComment(post._id, userData._id, text, usersData.pseudo, uid)
            )
                .then(() => dispatch(getPosts()))
                .then(() => setText(""));
        }
    };

    return (
        <div className="comments-container">
            {post.comments.map((comment) => {
                return (
                    <div
                        className={
                            comment.commenterId === userData._id
                                ? "comment-container client"
                                : "comment-container"
                        }
                        key={comment._id}
                    >
                        <div className="left-part">
                            <img
                                src={
                                    !isEmpty(usersData[0]) &&
                                    usersData
                                        .map((user) => {
                                            if (
                                                user._id === comment.commenterId
                                            )
                                                return user.picture;
                                            else return null;
                                        })
                                        .join("")
                                }
                                alt="commenter-pic"
                            />
                        </div>
                        <div className="right-part">
                            <div className="comment-header">
                                <div className="pseudo">
                                <h3>{!isEmpty(usersData[0]) &&
                                    usersData.map((user) => {
                                        if (user._id === comment.commenterId) return user.pseudo
                                        else return null;})
                                    }
                                        </h3>                                </div>
                                <span>
                                    {timestampParser(comment.timestamp)}
                                </span>
                            </div>
                            <p>{comment.text}</p>
                            <EditDeleteComment
                                comment={comment}
                                postId={post._id}
                            />
                        </div>
                    </div>
                );
            })}
            {userData._id && (
                <form onSubmit={handelComment} className="comment-form">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Laisser un commentaire"
                    />
                    <br />
                    <input type="submit" value="Commenter" />
                </form>
            )}
        </div>
    );
};

export default CardComments;
