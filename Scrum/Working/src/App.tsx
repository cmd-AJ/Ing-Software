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
import Threads from "./pages/threads/Threads";
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
import CloseContrat from "./components/Modals/Structures/CloseContrat";
import ModalStructure from "./components/Modals/ModalStructure";
import { getreview } from "./controller/ChatController";
import Reviewed from "./pages/review";
import Newjobs from "./pages/administration/componentes/Trabajos";

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
        <Route exact path="/admin">
          <Login_Admin />
        </Route>
        <Route exact path="/fg_pass">
          <Forgot_Page />
        </Route>
        <Route exact path="/">
          <Redirect to="/about" />
        </Route>
        {/* Protected Routes */}
        <ProtectedRoute exact path="/profile" component={Dashboard_Worker} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute exact path="/help" component={Help} />
        <ProtectedRoute exact path="/dash_admin" component={Mod_Dashboard} />
        <ProtectedRoute exact path="/mod_suspended" component={Suspendido} />
        <ProtectedRoute exact path="/mod_ticket" component={Tickt_page} />
        <ProtectedRoute exact path="/new_job" component={Newjobs} />

        <ProtectedRoute
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
        {/* Other protected routes with MainLayout */}

        <ProtectedRoute
          exact
          path="/employer-view"
          render={(props) => (
            <MainLayout>
              <EmployerProfileView {...props} />
            </MainLayout>
          )}
        />
        <ProtectedRoute
          exact
          path="/empleado"
          render={(props) => (
            <MainLayout>
              <Dashboard_Worker {...props} />
            </MainLayout>
          )}
        />
        <ProtectedRoute
          exact
          path="/chat"
          render={(props) => (
            <MainLayout>
              <Chat {...props} />
            </MainLayout>
          )}
        />
        <ProtectedRoute
          exact
          path="/dashboard"
          render={(props) => (
            <MainLayout>
              <Dashboard {...props} />
            </MainLayout>
          )}
        />
        <ProtectedRoute
          exact
          path="/help"
          render={(props) => (
            <MainLayout>
              <Help {...props} />
            </MainLayout>
          )}
        />
        <ProtectedRoute
          exact
          path="/threads"
          render={(props) => (
            <MainLayout>
              <Threads />
            </MainLayout>
          )}
        />

        <ProtectedRoute
          exact
          path="/review/:id"
          render={(props) => {
            // Extract search parameters from the URL
            const { id } = props.match.params;

            return (
              <MainLayout>
               <Reviewed id={id} ></Reviewed>
              </MainLayout>
            );
          }}
        />

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>

);

export default App;
