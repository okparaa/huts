import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import NoMatch from "./components/no-match";
import Footer from "./components/lib/footer";
import Login from "./components/users/login";
import Users from "./components/users/users-pot";
import SignUp from "./components/users/signup";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />}>
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/signup" element={<SignUp />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
