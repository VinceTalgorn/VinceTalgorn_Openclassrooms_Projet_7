//On importe les différentes pages et les fonctionnalités de REACT
import { UidContext } from "../components/AppContext";
import React, { useContext } from "react";
//import Log from "../components/Log";
import UpdateProfil from "../components/Profil/UpdateProfil";
import { Navigate } from "react-router-dom";
const Profil = () => {
    //const verifco = document.cookie
    const uid = useContext(UidContext);
    //si l'utilisateur n'est pas connecté on redirige vers la page Home
    //if(!uid) return redirect('/');
    //console.log(uid);
    return (
        <div className="profil-page">
            {
                uid ? <UpdateProfil /> : <Navigate to="/" replace={true} />
                /*(
                <div className="log-container">
                    <Log login={false} signup={true} />
                    <div className="img-container">
                        <img src="../img/log.svg" alt="log" />
                    </div>
                </div>
            )*/
            }
        </div>
    );
};
export default Profil;
