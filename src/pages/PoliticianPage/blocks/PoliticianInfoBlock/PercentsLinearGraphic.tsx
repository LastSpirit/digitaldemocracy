import React from 'react';
import styles from './PercentsLinearGraphic.module.scss';

const lines = [{
  id: 1,
  width: 20,
  color: '#BE3B21',
  zIndex: 5,
}, {
  id: 2,
  width: 40,
  color: '#EB4335',
  zIndex: 4,
}, {
  id: 3,
  width: 60,
  color: '#747373',
  zIndex: 3,
}, {
  id: 4,
  width: 80,
  color: '#34A853',
  zIndex: 2,
}, {
  id: 5,
  width: 100,
  color: '#248232',
  zIndex: 1,
}];

export const PercentsLinearGraphic = () => (
  <div className={styles.container}>
    {lines.map(({ color, id, width, zIndex }) => (
      <div
        key={id.toString()}
        style={{ width: `${width}%`, backgroundColor: color, zIndex }}
        className={styles.line}
      >
        <span>
          10%
        </span>
      </div>
    ))}
  </div>
);
