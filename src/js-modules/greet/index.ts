// import lodash from 'lodash';
//
// export const greet = (msg) => {
//   Promise.resolve().then(() => alert('greet'));
//
//   return lodash.join(['greet', msg, 2 ** 2, '!']);
// };

export const greet = (msg: string) => {
  // Promise.resolve().then(() => alert('greet'));

  return ['greet', msg, 2 ** 2, '!'].join();
};

export const greet2 = (msg: string) => {
  Promise.resolve().then(() => alert('greet'));

  return ['greet_2', msg, 2 ** 2, '!'].join();
};
