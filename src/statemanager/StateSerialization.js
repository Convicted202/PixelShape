import * as Selectors from 'selectors';

const Hash = {
  GUID: 'guid',
  SIZE: 'size',
  ACTIVE: 'active',
  FPS: 'fps',
  ORDER: 'order',
  FRAMES: 'frames'
};

export const StateSelector = {
  applicationGUID: Selectors.getProjectGuid,
  applicationSize: Selectors.getImageSize,
  applicationActiveFrame: Selectors.getCurrentFrameUUID,
  framesFps: Selectors.getFPS,
  framesOrder: Selectors.getFramesOrder,
  framesCollection: Selectors.getAllFrames
};

export const SerializationSchema = {
  meta: {
    schemaVersion: 'v1'
  },
  _export: {
    [Hash.GUID]: 'applicationGUID',
    [Hash.SIZE]: 'applicationSize',
    [Hash.ACTIVE]: 'applicationActiveFrame',
    [Hash.FPS]: 'framesFps',
    [Hash.ORDER]: 'framesOrder',
    [Hash.FRAMES]: 'framesCollection'
  },
  // should contain TWO props of a state
  _import: {
    'application.projectGuid': Hash.GUID,
    'application.size': Hash.SIZE,
    'frames.activeFrame': Hash.ACTIVE,
    'frames.fps': Hash.FPS,
    'frames.framesOrderArray': Hash.ORDER,
    'frames.framesCollectionObject': Hash.FRAMES
  }
};
