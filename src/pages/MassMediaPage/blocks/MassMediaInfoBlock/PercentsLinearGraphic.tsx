import React from 'react';
import { Tooltip } from '@material-ui/core';
import styles from './PercentsLinearGraphic.module.scss';

const lines = [
  {
    id: 1,
    width: 19,
    color: '#BE3B21',
    zIndex: 5,
  },
  {
    id: 2,
    width: 0,
    color: '#EB4335',
    zIndex: 4,
  },
  {
    id: 3,
    width: 35,
    color: '#747373',
    zIndex: 3,
  },
  {
    id: 4,
    width: 5,
    color: '#34A853',
    zIndex: 2,
  },
  {
    id: 5,
    width: 41,
    color: '#248232',
    zIndex: 1,
  },
];

export const PercentsLinearGraphic = () => {
  const firstIndex = lines.findIndex((it) => it?.width > 0);
  const lastIndex: number = lines.reduce(
    (
      acc: {
        width?: number;
        index?: number;
      },
      rec: {
        width?: number;
        index?: number;
        color?: string;
      },
      index: number
    ) => {
      return rec?.width !== 0 ? { ...acc, width: rec.width, index } : acc;
    },
    {}
  ).index;
  const nonEmpty = lines.filter((it) => it.width !== 0);
  const hiddenValue = 15;
  const widthWithoutCut = nonEmpty.reduce((acc, rec) => (rec.width > hiddenValue ? acc + rec.width : acc), 0);
  const count = nonEmpty.reduce((acc, rec) => {
    return rec.width < hiddenValue ? acc + 1 : acc;
  }, 0);
  const totalWidth = 100 - count * hiddenValue;
  const finalArray = lines.map((it) =>
    it.width > hiddenValue || it.width === 0
      ? { ...it, width: (it.width / widthWithoutCut) * totalWidth }
      : { ...it, width: hiddenValue }
  );
  return (
    <div className={styles.container}>
      {lines.map(({ color, id, width, zIndex }, index) => {
        const previosWidth = finalArray
          .filter((it, secondIndex) => secondIndex < index)
          .reduce((acc, rec) => acc + rec.width, 0);
        return (
          <>
            {width > 0 && (
              <div
                key={id.toString()}
                style={{
                  width: `${
                    width < hiddenValue
                      ? previosWidth + finalArray[index].width
                      : previosWidth + finalArray[index].width
                  }%`,
                  backgroundColor: color,
                  zIndex,
                  opacity: `${firstIndex === index || lastIndex === index ? 1 : 0.7}`,
                }}
                className={styles.line}
              >
                {width < hiddenValue ? (
                  <Tooltip title={`${Math.round(width)} %`} className={styles.tooltip}>
                    <div>{'...%'}</div>
                  </Tooltip>
                ) : (
                  <span>{`${Math.round(width)} %`}</span>
                )}
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};
