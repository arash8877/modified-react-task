import { useContext, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TrialDetails from "./components/trialDetails/TrialDetails";
import { TrialProvider } from "./contexts/TrialContext";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import { FavoriteProvider } from "./contexts/FavContext";
import Spinner from "./components/spinner/Spinner";

const Login = lazy(() => import("./pages/login/Login"));
const Register = lazy(() => import("./pages/register/Register"));
const Trials = lazy(() => import("./pages/trial/Trials"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const NotFound = lazy(() => import("./pages/notFound/NotFound"));

function App() {
  const { userId } = useContext(AuthContext);
  return (
    <TrialProvider>
      <FavoriteProvider>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route index element={userId ? <Trials /> : <Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            {userId && (
              <>
                <Route path="trials" element={<Trials />} />
                <Route path="trials/:nctId" element={<TrialDetails />} />
                <Route path="profile" element={<Profile />} />
              </>
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </FavoriteProvider>
    </TrialProvider>
  );
}

function WrappedApp() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default WrappedApp;
