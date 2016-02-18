import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

global.fetch = null;
require('whatwg-fetch');

function Hello(props) {
  return <h1>{props.name}</h1>;
}

ReactDOM.render(<Hello name="aoi" />, document.querySelector('#app-root'));
