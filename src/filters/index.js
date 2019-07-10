import moment from 'moment';

let time = function (str) {
  if (str !== undefined && str !== '' && str !== 0) {
    return moment(str).format('YYYY-MM-DD HH:mm:ss');
  } else {
    return '--';
  }
};

export {
  time
};
