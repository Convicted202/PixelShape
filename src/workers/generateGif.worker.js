import GIFEncoder from 'libs/gif/GIFEncoder';

self.onmessage = event => {

  const {
      frameNum,
      framesLength,
      height,
      width,
      delay,
      imageData
    } = event.data;

  const encoder = new GIFEncoder(); //create a new GIFEncoder for every new job

  encoder.setRepeat(0);
  encoder.setDelay(delay);
  encoder.setSize(width, height);
  encoder.setTransparent(0xffffff);

  if(frameNum == 0) {
    encoder.start();
  } else {
    encoder.cont();
    encoder.setProperties(true, false); //started, firstFrame
  }

  encoder.addFrame(imageData, true);
  if(framesLength == frameNum + 1) {
    encoder.finish();
  }

  self.postMessage({
    frameIndex: frameNum,
    frameData : encoder.stream().getData()
  });
};
