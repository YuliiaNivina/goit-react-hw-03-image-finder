import { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';

class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  handleOpenModal = () => {
    this.setState({ isModalOpen: true });
  };

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));
  };

  render() {
    const { webformatURL, largeImageURL } = this.props;
    const { isModalOpen } = this.state;

    return (
      <li className="imageGalleryItem">
        <img
          className="imageGalleryItem__img"
          src={webformatURL}
          alt=""
          onClick={this.handleOpenModal}
        />
        {isModalOpen && (
          <Modal onClose={this.toggleModal} image={largeImageURL} />
        )}
      </li>
    );
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
