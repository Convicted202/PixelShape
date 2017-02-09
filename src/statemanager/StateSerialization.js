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
  _import: {
    'application.projectGuid': Hash.GUID,
    'application.size': Hash.SIZE,
    'frames.activity.activeFrame': Hash.ACTIVE,
    'frames.activity.fps': Hash.FPS,
    'frames.order.framesOrderArray': Hash.ORDER,
    'frames.collection': Hash.FRAMES
  }
};
