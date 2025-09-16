export const debounce = (func) => {
  let timer;

  return function () {
    const context = this;
    const args = arguments;
    const runFunction = () => {
      func.apply(context, args);
    };

    clearTimeout(timer);
    timer = setTimeout(runFunction, 600);
  };
};
