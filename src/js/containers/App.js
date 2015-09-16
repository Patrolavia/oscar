import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-react-router';

class App extends Component {
  componentDidMount() {
    console.log('componentDidMount');
  }
  render() {
    const { children } = this.props;
    return (
      <div>
        <h1>App</h1>
        {children}
      </div>
    );
  }
}

App.propTypes = {
  pushState: PropTypes.func.isRequired,
  // Injected by React Router
  children: PropTypes.node
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
  pushState
})(App);
