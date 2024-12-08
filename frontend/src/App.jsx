import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import NotificationModal from "./components/user/NotificationModal";
import Sidebar from "./components/user/Sidebar";
import SidebarMobile from "./components/user/SidebarMobile";
import { useCurrentUserContext } from "./context/UserContext";
import "./i18n";
import DecisionsList from "./pages/administrator/DecisionsList";
import HomeAdmin from "./pages/administrator/HomeAdmin";
import Messages from "./pages/administrator/Messages";
import UsersList from "./pages/administrator/UsersList";
import Authentification from "./pages/Authentification";
import Error from "./pages/Error";
import CreateDecision from "./pages/user/CreateDecision";
import DecisionDetails from "./pages/user/DecisionDetails";
import Decisions from "./pages/user/Decisions";
import EditDecision from "./pages/user/EditDecision";
import ForgottenPassword from "./pages/user/ForgottenPassword";
import Help from "./pages/user/Help";
import HomeUser from "./pages/user/HomeUser";
import Inscription from "./pages/user/Inscription";
import LegalNotice from "./pages/user/LegalNotice";
import MyProfile from "./pages/user/MyProfile";
import Password from "./pages/user/Password";
import UserProfile from "./pages/user/UserProfile";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState();
  const [open, setOpen] = useState(true);
  const [openMobile, setOpenMobile] = useState(false);
  const location = useLocation();
  const { token } = useCurrentUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    //  console.log("TOKEN", token);
    if (!token) {
      navigate("/");
    }
  }, [token]);

  const [checked, setChecked] = useState(true);
  const handleChecked = () => {
    setChecked(!checked);
    if (!checked) {
      navigate("/home");
    } else {
      navigate("/homeadmin");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full ">
      {/* <div className="flex"> */}
      {location.pathname === "/" ||
      location.pathname === "/inscription" ||
      location.pathname === "/motdepasseoublie" ||
      location.pathname === "/legal-notice" ||
      token === null ||
      location.pathname === "/help" ||
      location.pathname.match(/^\/reviewpassword\/:(.*)$/) || // ^ et $ sont des ancrages de début et fin de chaîne pour le traitement du REGEX
      location.pathname === "/404" ? null : (
        <div className="relative">
          <aside className="h-screen sticky top-0 overflow-hidden hidden lg:block">
            <Sidebar
              showModal={showModal}
              setShowModal={setShowModal}
              open={open}
              setOpen={setOpen}
              checked={checked}
              setChecked={setChecked}
              handleChecked={handleChecked}
            />
          </aside>
          <div className="w-screen lg:hidden fixed bottom-0 left-0 right-0 z-50">
            <SidebarMobile
              showModal={showModal}
              setShowModal={setShowModal}
              open={open}
              setOpen={setOpen}
              checked={checked}
              setChecked={setChecked}
              handleChecked={handleChecked}
              openMobile={openMobile}
              setOpenMobile={setOpenMobile}
            />
          </div>
        </div>
      )}
      {showModal ? (
        <NotificationModal
          showModal={showModal}
          open={open}
          setShowModal={setShowModal}
        />
      ) : null}
      {token ? (
        <Routes>
          <Route path="/help" element={<Help />} />
          <Route path="/legal-notice" element={<LegalNotice />} />
          <Route
            path="/home"
            element={<HomeUser open={open} setOpen={setOpen} />}
          />
          <Route path="/" element={<Authentification />} />
          <Route path="/create-decision" element={<CreateDecision />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route
            path="/user-profile/:id"
            element={<UserProfile open={open} />}
          />
          <Route path="/decisions" element={<Decisions open={open} />} />
          <Route path="/decision/:id" element={<DecisionDetails />} />
          <Route
            path="/decision/:id/comments/:id"
            element={<DecisionDetails />}
          />
          <Route
            path="/edit-decision/:id"
            element={<EditDecision valuesDetailsDecisions />}
          />
          {/*  route admin */}
          <Route
            path="/homeadmin"
            element={
              <HomeAdmin
                open={open}
                setOpen={setOpen}
                checked={checked}
                setChecked={setChecked}
                handleChecked={handleChecked}
              />
            }
          />
          <Route path="/help" element={<Help />} />
          <Route path="/legal-notice" element={<LegalNotice />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/userslist" element={<UsersList />} />
          <Route path="/decisionslist" element={<DecisionsList />} />
          <Route path="/mailbox" element={<Messages />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
          <Route path="/404" element={<Error />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/reviewpassword/:passwordToken"
            element={<Password email={email} setEmail={setEmail} />}
          />
          <Route path="/" element={<Authentification />} />
          <Route path="/help" element={<Help />} />
          <Route path="/legal-notice" element={<LegalNotice />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route
            path="/motdepasseoublie"
            element={<ForgottenPassword email={email} setEmail={setEmail} />}
          />
          <Route path="*" element={<Navigate replace to="/404" />} />
          <Route path="/404" element={<Error />} />
        </Routes>
      )}
    </div>
  );
}
