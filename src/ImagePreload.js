import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import { UserImage } from './UserImage';

const imageStatus = {
  PENDING: 'PENDING',
  LOADED: 'LOADED',
  FAILED: 'FAILED',
};

const imageStyle = {
  width: '150px',
  height: 'auto',
};

/* eslint-disable */
class ImagePreload extends PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      status: imageStatus.PENDING,
    };
  }

  componentDidMount() {
    const {
      src,
    } = this.props;

    this.preloadImage(src);
  }

  onImageLoad(e) {
    console.log('event', e);
    this.setState({
      status: imageStatus.LOADED,
    });
  }

  onImageError() {
    this.setState({
      status: imageStatus.FAILED,
    });
  }

  preloadImage(imageSrc) {
    const image = new Image();

    image.onload = e => this.onImageLoad(e);
    image.onerror = () => this.onImageError();
    image.src = imageSrc;

    this.setState({
      image,
    });
  }

  render() {
    const {
      status,
      image,
    } = this.state;
    console.log('image', image);

    if (imageStatus.PENDING === status) {
      return (
        <div>
          PENDING
        </div>
      );
    } else if (imageStatus.LOADED === status) {
      return (
        <img
          src={image.src}
          style={imageStyle}
        />
      );
    }
    return (
      <div>
        FAILED
      </div>
    );
  }
}

export default ImagePreload;
