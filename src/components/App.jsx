import { Component } from 'react';
import axios from 'axios';
import { Notification } from './Loader/Loader';
import { Button } from './Button/Button';
import { ArticleList } from './ImageGallery/ImageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { AppStyled } from './AppStyle';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '29683186-89d5b8f18ccbe7d45b5194d45';

class App extends Component {
  state = {
    isLoading: false,
    articles: [],
    images: 20,
    query: '',
    showLargePic: false,
    showBtn: false,
    picData: {},
    page: 1
  };

  async componentDidMount() {
    const { query, images } = this.state; 
    try {
      const response = await axios.get(
        `?key=${KEY}&q=${query}&image_type=photo&per_page=${images}`, 
      );
      const { data } = response;
      const {hits } = data;
      if (query !== 0) {
        this.setState({
          articles: hits,
          showBtn: true,
        });
      } else {
        this.setState({
          isLoading: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { query, page, images} = this.state; 
    const { query: prevQuery, page: prevPage} = prevState; 

    if (query !== prevQuery || page !== prevPage ) {
      try {
        this.setState({ 
          isLoading: true,
        });
        const response = await axios.get(
          `?key=${KEY}&q=${query}&image_type=photo&per_page=${images}`, 
        );

        const { data} = response;
        const { hits, totalHits } = data;
        console.log(Math.floor(totalHits / 20) > page);
        console.log(query !==  0);

        if (query !==  0 || Math.floor(totalHits / 20) > page) {
          this.setState({
            totalHits: totalHits,
            articles: hits,
            isLoading: false,
          });
        } else {
          this.setState({
            isLoading: false,
          });
        }
        if (page <= Math.floor(totalHits / 20)) {
          this.setState({
            showBtn: true,
          });
        } else {
          this.setState({
            showBtn: false,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  setQuery = value => {
    this.setState({ query: value, showBtn: false, images: 20, page: 1});
  };  


  toggleLargeMode = picData => {
    this.setState(({ showLargePic }) => ({
      showLargePic: !showLargePic,
      picData,
    }));
  };

  handleLoadMore = () => {
    this.setState((p) => ({ page: p.page + 1, images: p.images + 20 }));
  };

  render() {
    const { articles, showBtn, showLargePic, picData, isLoading } = this.state;
    return (
      <AppStyled>
        <SearchBar onSubmit={this.setQuery} />
        {isLoading && <Notification />}
        <ArticleList
          articles={articles}
          toggleLargeMode={this.toggleLargeMode}
        />
        {showBtn && (
          <Button
            onClick={e => {
              this.handleLoadMore();
            }}
          />
        )}
        {showLargePic && (
          <Modal articles={picData} toggleLargeMode={this.toggleLargeMode} />
        )}
      </AppStyled>
    );
  }
}

export default App;
