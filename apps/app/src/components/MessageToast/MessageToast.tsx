import { Toaster, ToastBar } from 'react-hot-toast';
import styles from './MessageToast.module.scss';

const MessageToast = () => {
  return (
    <Toaster
      position='bottom-center'
      gutter={8}
      containerStyle={{
        zIndex: 10,
      }}>
      {(t) => (
        <ToastBar
          toast={t}
          style={{
            ...t.style,
            background: '#EBEBEB',
            color: '#171615',
            width: '100%',
            borderRadius: '14px',
          }}>
          {({ icon, message }) => (
            <div className={`${styles.toasterContainer}`}>
              {icon}
              <div>{message}</div>
            </div>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};

export default MessageToast;
