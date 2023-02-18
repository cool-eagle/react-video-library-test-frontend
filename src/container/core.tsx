import {ToastContainer} from 'react-toastify';
import {injectStyle} from 'react-toastify/dist/inject-style';

if(typeof window !== 'undefined') {
  injectStyle();
}

const Core = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default Core