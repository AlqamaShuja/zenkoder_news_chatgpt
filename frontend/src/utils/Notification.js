import { Stack, Snackbar, Alert, Slide, } from '@mui/material';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
import { forwardRef, useState } from 'react';


// const Alert = forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

export default function CustomizedSnackbars({ severity, msg, openX = false }){
  const [open, setOpen] = useState(openX);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={4000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        key={TransitionLeft ? TransitionLeft.name : ''}
      >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {msg ? msg:"Please provide a msg props"}
      </Alert>
    </Snackbar>
  );
}




















// import { notification } from 'antd'

// const getNotificationStyle = type => {
//     return {
//       success: {
//         color: 'rgba(0, 0, 0, 0.65)',
//         border: '1px solid #b7eb8f',
//         backgroundColor: '#f6ffed'
//       },
//       warning: {
//         color: 'rgba(0, 0, 0, 0.65)',
//         border: '1px solid #ffe58f',
//         backgroundColor: '#fffbe6'
//       },
//       error: {
//         color: 'rgba(0, 0, 0, 0.65)',
//         border: '1px solid #ffa39e',
//         backgroundColor: '#fff1f0'
//       },
//       info: {
//         color: 'rgba(0, 0, 0, 0.65)',
//         border: '1px solid #91d5ff',
//         backgroundColor: '#e6f7ff'
//       }
//     }[type]
//   }
  
// export const CustomNotification = ( type, msg, duration = 2 ) => {
//   notification[type]({
//     message: msg ? msg: "Please write a message",
//     style: getNotificationStyle(type),
//     duration: duration,
//   })
// }
