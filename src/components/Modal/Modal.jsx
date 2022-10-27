import { Gallery, Overlay} from './ModalStyle.js';

export const Modal = ({ articles, toggleLargeMode }) => {
    return (
        <Overlay>
            <Gallery onClick={toggleLargeMode}>
            <img src={articles} alt='jngbfgb'></img>
        </Gallery>
        </Overlay>
        
    )
};

export default Modal;