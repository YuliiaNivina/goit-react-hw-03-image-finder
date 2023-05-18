import { Component } from 'react';
import axios from 'axios';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import LoadMoreButton from 'components/LoadMoreButton/LoadMoreButton';
import Loader from 'components/Loader/Loader';


class App extends Component {
  state = {
    images: [],
    page: 1,
    searchQuery: '',
    loading: false,
  };

  handleSearch = async searchQuery => {
    const API_KEY = '34552003-c041c4010936caa6c4fdbe25f';
    const BASE_URL = `https://pixabay.com/api`;
    const page = 1;

    const url = `${BASE_URL}/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    try {
      this.setState({ loading: true });

      const response = await axios.get(url);
      
      const images = response.data.hits.map(image => ({
        id: image.id,
        webformatURL: image.webformatURL,
        largeImageURL: image.largeImageURL,
      }));

      this.setState({
        images,
        page,
        searchQuery,
        loading: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  loadMore = async () => {
    this.setState({ loading: true }); 
    
    const { searchQuery, page } = this.state;
    const API_KEY = '34552003-c041c4010936caa6c4fdbe25f';
    const BASE_URL = `https://pixabay.com/api`;
    const nextPage = page + 1;
    const url = `${BASE_URL}/?q=${searchQuery}&page=${nextPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    try {
      const response = await axios.get(url);

      const newImages = response.data.hits.map(image => ({
        id: image.id,
        webformatURL: image.webformatURL,
        largeImageURL: image.largeImageURL,
      }));

      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        page: nextPage,
        loading: false,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { images, loading } = this.state;
   
    return (
      <div className="app">
        <Searchbar onSubmit={this.handleSearch} />
        {loading && <Loader />}
        <ImageGallery images={images} />
        {images.length > 0 && <LoadMoreButton onClick={this.loadMore} />}
 
      </div>
    );
  }
}
export default App;
