import React, { Component } from 'react';
import { withRouter } from 'react-router';
import 'semantic-ui-css/semantic.css';
import './App.css';


const fetchJson = (url, config) => {
  return fetch(url,{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    ...config
  })
  .then(response => response.json());
}

class App extends Component {
  state = {
    fetchingData: false,
    beers: []
  }

  componentDidMount() {
    this.setState({fetchingData: true});
    fetchJson('https://bv73j4e79b.execute-api.us-east-1.amazonaws.com/dev/beer/all')
    .then(data => {
      this.setState({fetchingData: false, beers:data.Items});
    })
  }

  handleNew = (data) => {
    this.setState({fetchingData: true});
    this.props.router.goBack();
    fetchJson('https://bv73j4e79b.execute-api.us-east-1.amazonaws.com/dev/beer/new',{
      method: "POST",
      body: data
    })
    .then(data => {
      this.setState({fetchingData: false, beers:this.state.beers.concat(data.Item)});
    });

  }

  render() {
    const child = this.props.children && React.cloneElement(this.props.children,
      {
        fetchingData: this.state.fetchingData,
        beers: this.state.beers,
        create: this.handleNew
      }
    );

    return (
      <div className="App">
        <header className="App-header">
          <h1>🍺SLS<span className="App-logo-separator">⚡</span>Beer</h1>
        </header>

        <div className="App-contents">
          {child}
        </div>
      </div>
    );
  }
}

// Export the decorated class
export default withRouter(App);

// PropTypes
App.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
};
