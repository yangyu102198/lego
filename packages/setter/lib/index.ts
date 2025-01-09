//基础的setter
import baseSetter from './baseSetter';
//布局的setter
import layout from './layout';
//样式的setter
import style from './styleSetter';

export default [...style, ...baseSetter, ...layout];
