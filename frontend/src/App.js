import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import pages from './pages';
import common from './components/common';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={common.Theme}>
        <common.Header />

        <main style={{ height: '80vh' }}>
          <Switch>
            <Route path="/" component={pages.Landing} exact />
            <Route path="/signin" component={pages.SignIn} />
            <Route path="/signup" component={pages.SignUp} />
            <Route path="/profile" component={pages.Profile} />
            <Route path="/addphoto" component={pages.AddPhoto} />
            <Route path="/hire" component={pages.Hire} />
            <Route path="/findwork" component={pages.FindWork} />
            <Route
              path="/photographers/:id"
              component={pages.PhotographerProfile}
            />
          </Switch>
        </main>

        {/* <common.Footer /> */}
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
