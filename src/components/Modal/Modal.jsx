import { Component } from 'react';
import { Gallery, Overlay, Img } from './ModalStyle.js';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.toggleLargeMode();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget !== event.target) {
      this.props.toggleLargeMode();
    }
  };
  render() {
    const { articles } = this.props;
    console.log(articles);
    return (
      <Overlay>
        <Gallery onClick={this.handleBackdropClick}>
          <Img src={articles}></Img>
        </Gallery>
      </Overlay>
    );
  }
}

export default Modal;
