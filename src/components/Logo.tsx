import type { FC } from 'react';
import type { Theme } from '@material-ui/core';
import type { SxProps } from '@material-ui/system';
import './styles.css';
import { ReactComponent as ReactLogo1 } from '../icons/logo/1.svg';
import { ReactComponent as ReactLogo2 } from '../icons/logo/2.svg';
import { ReactComponent as ReactLogo3 } from '../icons/logo/3.svg';
import { ReactComponent as ReactLogo4 } from '../icons/logo/4.svg';

interface LogoProps {
  sx?: SxProps<Theme>;
}
const animationName = 'fade';
const imageStyle: any = {
  position: 'absolute',
  top: 9,
  animationName,
  animationIterationCount: 'infinite',
  animationDuration: '5s',
  width: 72,
  height: 72,
};

const Logo: FC<LogoProps> = () => (
  <div>
    <ReactLogo1 style={imageStyle} />
    <ReactLogo2
      style={imageStyle}
      className="delayForOne"
    />
    <ReactLogo3
      style={imageStyle}
      className="delayForTwo"
    />
    <ReactLogo4
      style={imageStyle}
      className="delayForThree"
    />
  </div>
);

export default Logo;
