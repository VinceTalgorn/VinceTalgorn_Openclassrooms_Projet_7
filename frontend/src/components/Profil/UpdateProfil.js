//On importe les différentes pages et les fonctionnalités de REACT
import React from "react";
import LeftNav from "../LeftNav";
import { useSelector, useDispatch } from "react-redux";
import UploadImg from "./UploadImg";
import { useState } from "react";
import { upadateBio } from "../../actions/user.actions";
import { dateParser } from "../Utils";

//Pour modiifer le profil
const UpdateProfil = () => {
    const [bio, setBio] = useState("");
    const [updateForm, setUpdateForm] = useState(false);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch(null);

    const handelUpdate = () => {
        dispatch(upadateBio(userData._id, bio));
        setUpdateForm(false);
    };

    return (
        <div className="profil-container">
            <LeftNav />
            <h1> Profil de {userData.pseudo} </h1>
            <div className="update-container">
                <div className="left-part">
                    <h3>Photo de profil</h3>
                    <img src={userData.picture} alt="user-pic" />
                    <UploadImg />
                </div>
                <div className="right-part">
                    <div className="bio-update">
                        <h3>Biographie</h3>
                        {updateForm !== true && (
                            <>
                                <p onClick={() => setUpdateForm(!updateForm)}>
                                    {userData.bio}
                                </p>
                                <button
                                    onClick={() => setUpdateForm(!updateForm)}
                                >
                                    Modifier bio
                                </button>
                            </>
                        )}
                        {updateForm === true && (
                            <>
                                <textarea
                                    type="text"
                                    defaultValue={userData.bio}
                                    onChange={(e) => setBio(e.target.value)}
                                ></textarea>
                                <button onClick={handelUpdate}>
                                    Valider modifications
                                </button>
                            </>
                        )}
                    </div>
                    <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfil;
