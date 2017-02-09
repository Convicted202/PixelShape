let idCounter = 0;

// needed only when importing course with frames present
export const setInitialCounter = val => {
  idCounter = val;
};

// modified underscore's uniqueId
export const uniqueId = prefix => {
  const id = `${idCounter}`;
  idCounter++;
  prefix = prefix ? prefix : 'unique';
  return `${prefix}${id}`;
};

export const uuid = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};
