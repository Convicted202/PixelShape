import Brush from './brush/Brush';
import Bucket from './bucket/Bucket';
import ColorReplace from './colorreplace/ColorReplace';
import Eraser from './eraser/Eraser';
import Dropper from './dropper/Dropper';
import Rectangle from './rectangle/Rectangle';
import Ellipse from './ellipse/Ellipse';
import Lightener from './lightener/Lightener';
import Darkener from './darkener/Darkener';

const toolsMap = new Map();

toolsMap.set('Brush', new Brush());
toolsMap.set('Bucket', new Bucket());
toolsMap.set('ColorReplace', new ColorReplace());
toolsMap.set('Eraser', new Eraser());
toolsMap.set('Dropper', new Dropper());
toolsMap.set('Rectangle', new Rectangle());
toolsMap.set('Ellipse', new Ellipse());
toolsMap.set('Lightener', new Lightener());
toolsMap.set('Darkener', new Darkener());


export default toolsMap;
