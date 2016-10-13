export const SET_IMAGE_SIZE = 'APP:SET_SIZE';
export const SET_PIXEL_SIZE = 'APP:SET_PIXEL_SIZE';

export const setImageSize = (width, height) => ({
  type: SET_IMAGE_SIZE,
  width,
  height
});

export const setPixelSize = size => ({
  type: SET_PIXEL_SIZE,
  size
});
