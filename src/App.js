import React, { Component } from 'react';
import { withRouter } from 'react-router';
import 'semantic-ui-css/semantic.css';
import './App.css';

const apiBasePath = 'https://uzxg7c851g.execute-api.us-east-1.amazonaws.com/dev';

const fetchJson = (url, config) => {
  return fetch(apiBasePath + url,{
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
    this.loadBeers();
  }

  loadBeers = () => {
    this.setState({fetchingData: true});
    fetchJson('/beer/all')
    .then(data => {
      this.setState({fetchingData: false, beers:data.Items});
    })
  }

  handleNew = (data) => {
    fetchJson('/beer/new',{
      method: "POST",
      body: data
    })
    .then(data => {
      this.props.router.push({
        pathname: '/photo',
        state: { uploadURL: data.uploadURL }
      })
    });
  }

  handleUpload = (url, imageBlob) => {
    fetch(url, {
      method: "PUT",
      body: imageBlob
    })
    .then(data => {
      this.loadBeers();
      this.props.router.push('/');
    })
  }

  render() {
    const child = this.props.children && React.cloneElement(this.props.children,
      {
        fetchingData: this.state.fetchingData,
        beers: this.state.beers,
        create: this.handleNew,
        upload: this.handleUpload,
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
