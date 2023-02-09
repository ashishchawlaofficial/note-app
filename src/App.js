import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Authenticate from "./components/auth/Authenticate";
import Home from "./components/pages/Home";
import Protected from "./components/auth/Protected";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setUser } from "./store/slices/AuthSlice";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const locFrom = location.state ? location.state?.from : "/";

  useEffect(() => {
    if (!isLoggedIn) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(setUser({ user, isLoggedIn: true }));
          navigate(locFrom);
        }
      });
    }
  }, [dispatch, isLoggedIn, navigate, locFrom]);

  return (
    <div className="App">
      <Routes>
        <Route path="auth" element={<Authenticate />} />
        <Route element={<Protected />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
