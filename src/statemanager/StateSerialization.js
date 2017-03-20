import * as Selectors from '../selectors';

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
    'undoables.present.application.projectGuid': Hash.GUID,
    'undoables.present.application.size': Hash.SIZE,
    'undoables.present.frames.activity.activeFrame': Hash.ACTIVE,
    'undoables.present.frames.activity.fps': Hash.FPS,
    'undoables.present.frames.order.framesOrderArray': Hash.ORDER,
    'undoables.present.frames.collection': Hash.FRAMES
  },

  _framesImport: {
    'undoables.present.application.projectGuid': 'guid',
    'undoables.present.application.size': 'size',
    'undoables.present.frames.activity.activeFrame': 'active',
    'undoables.present.frames.activity.fps': 'fps',
    'undoables.present.frames.order.framesOrderArray': 'order',
    'undoables.present.frames.collection': 'collection'
  }
};
