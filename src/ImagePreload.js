import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const imageStatus = {
  PENDING: 'PENDING',
  LOADED: 'LOADED',
  FAILED: 'FAILED',
};

const imageStyle = {
  width: '150px',
  height: 'auto',
};

class ImagePreload extends PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      status: imageStatus.PENDING,
    };
  }

  handleLoad = () => {
    this.setState({
      status: imageStatus.LOADED
    });
  };

  handleError = () => {
    this.setState({
      status: imageStatus.FAILED,
    });
  }

  isVisible = (status) => ({
    visibility: status === imageStatus.LOADED ? 'visible' : 'hidden'
  });

  render() {
    const { src } = this.props;

    const { status } = this.state;

    return (
      <div className="image-wrapper">
        {status === imageStatus.PENDING && (
          <div className="placeholder">
            PENDING
          </div>
        )}

        <img
          src={src}
          alt="image"
          style={{...imageStyle, ...this.isVisible(status)}}
          onLoad={this.handleLoad}
          onError={this.handleError}
        />
      </div>
    );
  }
}

export default ImagePreload;
