import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Rocket from "./components/OpeningSlide/Rocket/Rocket.jsx";
import Splashscreen from "./components/OpeningSlide/splashscreen/Splashscreen.jsx";
import Login from "./components/Login/Login.jsx";
import Home from "./components/Home/Home.jsx";
import Register from "./components/Register/Register.jsx";
import RegisteredPage from "./components/Home/Registered.jsx";
import Technical from "./components/Rounds/Technical.jsx";
import Webdev from "./components/Rounds/Webdev.jsx";
import Design from "./components/Rounds/Design.jsx";
import Programming from "./components/Rounds/Programming.jsx";
import Android from "./components/Rounds/Android.jsx";
import AuthWrapper from "./components/AuthWrraper.jsx";
import Logout from "./components/Logout.jsx";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Splashscreen />} />
        <Route path="/Rocket" element={<Rocket />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        {/* <Route element={<AuthWrapper />}> */}
          <Route path="/Registered/:userId" element={<RegisteredPage />} />
        {/* </Route> */}
        <Route path="/Technical/:userId" element={<Technical />} />
        <Route path="/Webdev/:userId" element={<Webdev />} />
        <Route path="/Design/:userId" element={<Design />} />
        <Route path="/Programming/:userId" element={<Programming />} />
        <Route path="/Technical-Domain/:userId" element={<Android />} />
        <Route path="/logout" element={<Logout />} />
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
