import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles';

const StatusBullet = ({ className, size, color, ...props }) => {
  const classes = styles();

  return (
    <span
      {...props}
      className={classnames(
        {
          [classes.root]: true,
          [classes[size]]: size,
          [classes[color]]: color,
        },
        className
      )}
    />
  );
};

StatusBullet.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'neutral',
    'primary',
    'info',
    'success',
    'warning',
    'danger',
  ]),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

StatusBullet.defaultProps = {
  size: 'md',
  color: 'default',
};

export default StatusBullet;
