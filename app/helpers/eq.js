import { helper } from '@ember/component/helper';

export function eq(params/*, hash*/) {
  if (params.length <= 1) return true;
  let first = params[0];
  return params.every(el => el == first);
}

export default helper(eq);
