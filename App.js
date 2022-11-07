//On importe les différentes fonctionalitées de REACT
import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { UidContext } from "./components/AppContext";
import { useDispatch } from "react-redux";
//On importe nos pages
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import Trending from "./pages/Trending";
import Navbar from "./components/Navbar";
import { getUser } from "./actions/user.actions";
import cookie from "js-cookie";

const App = () => {
    const [uid, setUid] = React.useState(null);
    const dispatch = useDispatch();

    //On vient vérifier si le bon utilisateur est bien connecté grâce au token
    useEffect(() => {
        const removeCookie = (key) => {
            if (window !== undefined) {
                cookie.remove(key, { expires: 1 });
            }
        };
        const fetchData = async () => {
            await fetch(
                `${process.env.REACT_APP_API_URL}api/user/isConnected`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            )
                .then((res) => res.json())
                .then((res) => {
                    //si le token n'est pas valide on releve une erreur, ce qui a pour effet d'aller dans le catch sans faire le setUid
                    //car sans cela le setUid ajoute le message "No Token" dans le uid
                    if (res.message && res.message === "No token")
                        throw new Error("No token");

                    //console.log(res);
                    setUid(res);
                    if (uid) dispatch(getUser(uid));
                    console.log(uid);
                })
                .catch((err) => console.log(err));
        };
        fetchData();
    }, [uid, dispatch]);
    //On retourne ce que l'on doit afficher sur la page
    return (
        <Router>
            <Navbar />
            <UidContext.Provider value={uid}>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/profil" element={<Profil />} />
                    <Route path="/trending" element={<Trending />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </UidContext.Provider>
        </Router>
    );
};

export default App;
