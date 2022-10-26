import { RotatingLines } from 'react-loader-spinner';

const Notification = () => {
  return <RotatingLines
  strokeColor="grey"
  strokeWidth="5"
  animationDuration="0.75"
  width="50"
  visible={true}
/>;
};

export default Notification;



