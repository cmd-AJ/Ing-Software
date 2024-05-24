import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Searched from "./pages/Searched";
import MainLayout from "./pages/MainLayout/MainLayout";
import About from "./pages/About";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./pages/Login.css";
import Dashboard_Worker from "./pages/Dashboard-Worker";
import React from "react";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/profile">
          <Dashboard_Worker />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/">
          <About />
        </Route>

        {/*
        Single page implementation
        */}
        <Route exact path="/searched">
          <Route
            path="/searched"
            render={({ location }) => {
              const dpi = new URLSearchParams(location.search).get("dpi");
              const job = new URLSearchParams(location.search).get("job");
              return (
                <MainLayout>
                  <Searched dpi={dpi || ""} job={job || ""} />
                </MainLayout>
              );
            }}
            exact
          />
        </Route>
        <Route exact path="/empleado">
          <MainLayout>
            <Dashboard_Worker />
          </MainLayout>
        </Route>
        <Route exact path="/chat">
          <MainLayout>
            <Chat />
          </MainLayout>
        </Route>
        <Route exact path="/dashboard">
          <MainLayout>
            <Dashboard />
          </MainLayout>
        </Route>
        <Route exact path="/">
          <Redirect to="/about" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
