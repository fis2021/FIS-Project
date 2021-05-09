import React from "react";
import "./App.css";
import { useTitle } from "./utils/utilFunctions";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";
import { Route, Redirect } from "react-router-dom";
import { route, urls, startUrl } from "./routing/routes";
import { Content } from "./pages/content";
import { LandingPage } from "./pages/start-pages/landing-page";
import { AdminLanding } from "./pages/admin-panel/hello-admin";
import { BookAdd } from "./pages/admin-panel/edit-post-book";
import { BookPage } from "./components/single-book-page";
import { AdminAdd } from "./pages/admin-panel/admin-add";
import { UserContextProvider } from "./contexts/userContext";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#404040",
    },
  },
});

function App() {
  useTitle("FIS Project");
  return (
    <div className="App">
      <UserContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Route
          path={route(urls.startPage, ["route"])}
          component={LandingPage}
        />
        <Route
          exact
          path={route(urls.contentPage)}
          component={Content}
        />
        <Route
          exact
          path={route(urls.adminPanel)}
          component={AdminLanding}
        />
        <Route
          exact
          path={route(urls.addBook)}
          component={BookAdd}
        />
        <Route
          exact
          path={route(urls.editBook, ["id"])}
          component={BookAdd}
        />
        <Route
          exact
          path={route(urls.addAdminAccount)}
          component={AdminAdd}
        />
        <Route
          exact
          path={route(urls.bookPage, ["id"])}
          component={BookPage}
        />
        <Route exact path="/">
          <Redirect to={startUrl()} />
        </Route>
      </ThemeProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
