import React from 'react';
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group'
import { SessionProvider } from '../contexts/SessionContext';
import login from './Login/login';
import SplashScreen from './Splash/SplashScreen';
import MainView from './MainView/MainView';
import './App.scss';

type AppState = {
  loading: boolean;
  loggedIn: boolean;
}

type SessionContextType = {
  userName?: string;
  fullName? : string;
  userId?: string;
  token?: string;
}

class App extends React.Component<{}, AppState> {
  
  state: AppState = {
    loading: true,
    loggedIn: false
  }

  sessionContext: SessionContextType = {

  }

  hideSplash = () => {
    this.setState({
      loading: false
    })
  }

  componentDidMount() {
    login().then(data => {
      this.sessionContext = data as SessionContextType;

      this.setState({
        loggedIn: true
      })
    }).catch(error => {
      //Still have to write some login in the case of failed login
      //Probbably the best i can do is to show connection error message
    })
  }

  render() {
    return (
      <SessionProvider value={this.sessionContext}>

        <Helmet>
          <title>react-platform</title>
        </Helmet>

        <Router>

          <Route
            path={this.state.loading ? '*' : '/dont-display/'}
            exact
          >
            {({ match }) => (
              <CSSTransition
                in={match != null}
                timeout={1000}
                classNames="transition"
                unmountOnExit
              >
                <SplashScreen />
              </CSSTransition>
            )}
          </Route>

          <Switch>

            <Route 
              exact
              path='/'
              render={props => (
                <MainView {...props} onReady={this.hideSplash} />
              )}
            />

          </Switch>
        </Router>
      </SessionProvider>
    );
  }
}

export default App;