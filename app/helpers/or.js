import { helper } from '@ember/component/helper';

export function or(params/*, hash*/) {
  return params.reduce((prev, next) => {
    return prev || next;
  });
}

export default helper(or);
