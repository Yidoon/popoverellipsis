import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import Test from './Test';
import './style.css';
import 'antd/dist/antd.css';

interface AppProps {}
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <Test />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
