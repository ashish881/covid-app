import "./App.css";
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";
import Header from "./component/Header";
import HomeScreen from "./screen/HomeScreen";
import ProtectedRoute from "./component/ProtectedRoute";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App(props) {
  console.log("app--------------------", props);
  return (
    <div className="App">
      {" "}
      <Router>
        <Header></Header>
        <ProtectedRoute path="/" component={HomeScreen} exact></ProtectedRoute>
        <Route path="/login" component={LoginScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
      </Router>
    </div>
  );
}

export default App;
