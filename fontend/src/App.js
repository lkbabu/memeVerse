import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { Container } from "semantic-ui-react";
import Header from "./components/Header";
import { AuthProvider } from "./util/authorization";
import AuthRoute from "./util/AuthRoute";
import SinglePostScreen from "./screens/SinglePostScreen";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Container>
          <Header />
          <Route exact path="/" component={HomeScreen} />
          <AuthRoute exact path="/login" component={LoginScreen} />
          <AuthRoute exact path="/register" component={RegisterScreen} />
          <Route exact path="/posts/:postId" component={SinglePostScreen} />
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
