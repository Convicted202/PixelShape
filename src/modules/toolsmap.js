import Brush from './brush/Brush';
import Bucket from './bucket/Bucket';
import Eraser from './eraser/Eraser';
import Dropper from './dropper/Dropper';
import Rectangle from './rectangle/Rectangle';
import Ellipse from './ellipse/Ellipse';

const toolsMap = new Map();

toolsMap.set('brush', new Brush());
toolsMap.set('colorfill', new Bucket());
toolsMap.set('eraser', new Eraser());
toolsMap.set('dropper', new Dropper());
toolsMap.set('rect', new Rectangle());
toolsMap.set('circle', new Ellipse());


export default toolsMap;
