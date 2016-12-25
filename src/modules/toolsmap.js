import Brush from './brush/Brush';
import Bucket from './bucket/Bucket';
import Eraser from './eraser/Eraser';
import Dropper from './dropper/Dropper';
import Rectangle from './rectangle/Rectangle';
import Ellipse from './ellipse/Ellipse';

const toolsMap = new Map();

toolsMap.set('Brush', new Brush());
toolsMap.set('Bucket', new Bucket());
toolsMap.set('Eraser', new Eraser());
toolsMap.set('Dropper', new Dropper());
toolsMap.set('Rectangle', new Rectangle());
toolsMap.set('Ellipse', new Ellipse());


export default toolsMap;
