import 'babel-polyfill';
import 'whatwg-fetch';
import es6promise from 'es6-promise';
import React from 'react';
import ReactDOM from 'react-dom';

es6promise.polufill();

function Hello(props) {
  return <h1>{props.name}</h1>;
}

ReactDOM.render(<Hello name="aoi" />, document.querySelector('#app-root'));
