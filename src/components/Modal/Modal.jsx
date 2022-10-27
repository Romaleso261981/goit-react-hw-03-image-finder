import { Gallery, Overlay} from './ModalStyle.js';

export const Modal = ({ articles, toggleLargeMode }) => {
    console.log(articles);
    return (
        <Overlay>
            <Gallery onClick={toggleLargeMode}>
            <img src={articles} alt='jngbfgb'></img>
        </Gallery>
        </Overlay>
        
    )
};

export default Modal;