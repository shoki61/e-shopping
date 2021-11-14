import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Warning from '@material-ui/icons/WarningTwoTone';
import Cancel from '@material-ui/icons/CancelTwoTone';
import CheckCircle from '@material-ui/icons/CheckCircleTwoTone';
import Info from '@material-ui/icons/InfoTwoTone';

class AppNotification extends Component {
  static success = (message: string) => toast.success(message, { theme: 'colored', icon: <CheckCircle /> });
  static error = (message: string) => toast.error(message, { theme: 'colored', icon: <Cancel /> });
  static info = (message: string) => toast.info(message, { theme: 'colored', icon: <Info /> });
  static warning = (message: string) => toast.warning(message, { theme: 'colored', icon: <Warning /> });
  render() {
    return <ToastContainer />;
  }
}

export default AppNotification;
