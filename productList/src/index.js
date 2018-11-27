import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { store } from './redux/store';
import { history } from './redux/store';

//style
import 'bootstrap/dist/css/bootstrap.css';
import { Container } from 'reactstrap';

import Products from './components/Products';
import Single from './components/SingleProduct';

class RootComponent extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
        <Container><Switch>
            <Route exact path="/" component={Products} />
            <Route path='/:id' component={Single} />
          </Switch></Container>
          
        </ConnectedRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<RootComponent/>, document.getElementById('root'));