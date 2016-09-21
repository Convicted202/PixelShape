let idCounter = 0;

// modified underscore's uniqueId
const uniqueId = prefix => {
  const id = '' + idCounter;
  idCounter++;
  prefix = prefix ? prefix : 'unique';
  return `${prefix}${id}`;
}

export default uniqueId;
