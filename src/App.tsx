import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import store from "./redux/store";
import AppRoutes from "./Routes";
import {Header} from "./components/Header";
import {Container} from "react-bootstrap";

const App = () => (
  <Provider store={store}>
    <Header />
    <Container fluid style={{marginTop: 56}}>
      <AppRoutes />
    </Container>
  </Provider>
)

export default App;
