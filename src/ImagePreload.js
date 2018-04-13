import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const imageStatus = {
  PENDING: 'PENDING',
  LOADED: 'LOADED',
  FAILED: 'FAILED',
};

class ImagePreload extends PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
    initialComponent: PropTypes.func.isRequired,
    preloadComponent: PropTypes.func.isRequired,
    imageStyle: PropTypes.object,
  };

  static defaultProps = {
    imageStyle: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      status: imageStatus.PENDING,
    };
  }

  handleLoad = () => {
    this.setState({
      status: imageStatus.LOADED,
    });
  };

  handleError = () => {
    this.setState({
      status: imageStatus.FAILED,
    });
  }

  isVisible = status => ({
    display: status === imageStatus.LOADED ? '' : 'none',
  });

  loadImage = () => {
    const { src, imageStyle, ...rest } = this.props;
    const { status } = this.state;

    return (
      <img
        src={src}
        alt=""
        style={{ ...imageStyle, ...this.isVisible(status) }}
        {...rest}
        onLoad={this.handleLoad}
        onError={this.handleError}
      />
    );
  };

  render() {
    const { initialComponent, preloadComponent } = this.props;

    const { status } = this.state;

    return (
      <div className="image-wrapper">
        {status === imageStatus.PENDING && (
          <div className="initial-component-wrapper">
            {initialComponent()}
          </div>
        )}

        <div
          className="preload-component-wrapper"
          style={{ ...this.isVisible(status) }}
        >
          {preloadComponent(this.loadImage)}
        </div>
      </div>
    );
  }
}

export default ImagePreload;
