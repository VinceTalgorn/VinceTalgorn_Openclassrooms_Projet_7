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

const App = () => {
    const [uid, setUid] = React.useState(null);
    const dispatch = useDispatch();

    //On vient vérifier si le bon utilisateur est bien connecté grâce au token
    useEffect(() => {
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
                    if (res.message && res.message === "No token")
                        throw new Error("No token");
                    setUid(res);

                    if (uid) dispatch(getUser(uid));
                    console.log("Le problème est :" + uid);
                })
                .catch((err) => console.log(err));
        };
        fetchData();

        if (uid) dispatch(getUser(uid));
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
