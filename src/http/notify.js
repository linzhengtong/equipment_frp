import { Notification, Message } from 'element-ui';

export const notifySuccess = (msg) => {
  return Notification({
    type: 'success',
    title: '成功',
    message: msg
  });
};

export const notifyError = (msg) => {
  return Notification({
    type: 'error',
    title: '错误',
    message: msg
  });
};

export const messageSuccess = (msg) => {
  return Message({
    showClose: true,
    type: 'success',
    message: msg
  });
};

export const messageError = (msg) => {
  return Message({
    showClose: true,
    type: 'error',
    message: msg
  });
};

export const messageWarning = (msg) => {
  return Message({
    showClose: true,
    type: 'warning',
    message: msg
  });
};
