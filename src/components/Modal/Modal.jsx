import { Component } from 'react';
import { Gallery, Overlay, Img } from './ModalStyle.js';

export class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  };

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
    return (
      <Overlay>
        <Gallery onClick={this.handleBackdropClick}>
          <Img src={this.props.articles} alt='jngbfgb'></Img>
        </Gallery>
      </Overlay>
        
    )
  }
};

export default Modal;