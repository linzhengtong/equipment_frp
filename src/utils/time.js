import moment from 'moment';

export function time (parms) {
  return moment(parms).format('MMMM-YY-DD HH:mm:ss');
}