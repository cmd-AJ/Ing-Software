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
import Help from "./pages/Help"


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
import EmployerProfileView from "./pages/employer_view/EmployerProfileView";
import Login_Admin from "./pages/administration/Login_Admin";
import Mod_Dashboard from "./pages/administration/Mod_Dashboard";
import Suspendido from "./pages/administration/Suspended_page";
import Tickt_page from "./pages/administration/Tickets_page";
import Forgot_Page from "./pages/administration/Fg_pass";
import ProtectedRoute from "./pages/administration/componentes/Routeprotecion";

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
        <Route exact path="/help">
          <Help />
        </Route>
        <Route exact path="/admin">
          <Login_Admin/>
        </Route>
        <Route exact path="/dash_admin">
          <Mod_Dashboard/>
        </Route>
        <Route exact path="/mod_suspended">
        <Suspendido/>
        </Route>
        <Route exact path="/mod_ticket">
          <Tickt_page/>
        </Route>
        <Route exact path="/fg_pass">
          <Forgot_Page/>
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




        <Route exact path = "/employer-view">
            <MainLayout>
              <EmployerProfileView />
            </MainLayout>
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
        <Route exact path="/help">
          <MainLayout>
          <Help />
          </MainLayout>
        </Route>
        <Route exact path="/">
          <Redirect to="/about" />
        </Route>

        {/* NO BORRAR ESTO ES PARA REDIRECCIONAR HACIA EL ABOUT */}
        {/* <ProtectedRoute
        exact
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
      />
      <ProtectedRoute exact path="/profile" component={Dashboard_Worker} />
      <ProtectedRoute exact path="/dashboard" component={Dashboard} />
      <ProtectedRoute exact path="/help" component={Help} />
      <ProtectedRoute exact path="/dash_admin" component={Mod_Dashboard} />
      <ProtectedRoute exact path="/mod_suspended" component={Suspendido} />
      <ProtectedRoute exact path="/mod_ticket" component={Tickt_page} />
      <ProtectedRoute exact path="/fg_pass" component={Forgot_Page} />

        <ProtectedRoute exact path="/employer-view" component={EmployerProfileView} />
        <ProtectedRoute exact path="/empleado" component={Dashboard_Worker} />
        <ProtectedRoute exact path="/chat" component={Chat} /> */}

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
