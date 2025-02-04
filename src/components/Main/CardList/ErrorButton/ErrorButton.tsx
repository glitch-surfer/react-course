import { Component } from 'react';
import './ErrorButton.css';

class ErrorButton extends Component {
  state = {
    throwError: false,
  };

  handleClick = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('Test Error: This is a simulated error!');
    }

    return (
      <button className="error-button" onClick={this.handleClick}>
        Throw Error
      </button>
    );
  }
}

export default ErrorButton;
