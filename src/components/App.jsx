import { Component } from 'react';
import { Notification } from './Loader/Loader';
import { Button } from './Button/Button';
import { ArticleList } from './ImageGallery/ImageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import { fetchImages } from './ApiServise/ApiServise';
import { Modal } from './Modal/Modal';
import { AppStyled } from './AppStyle';

class App extends Component {
  state = {
    isLoading: false,
    articles: [],
    query: '',
    showLargePic: false,
    showBtn: true,
    picData: {},
    page: 1,
    totalHits: 0,
  };

  async componentDidMount() {
    const { query, page, totalHits } = this.state;
    try {
      const { hits } = await fetchImages(query, page);
      const normalHits = hits.map(({ id, largeImageURL, webformatURL, tags }) => ({
        id,
        largeImageURL,
        webformatURL,
        tags,
      }))
      this.setState({
        articles: [...normalHits],
        showBtn: page < Math.floor(totalHits / 12),
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    const { query: prevQuery, page: prevPage } = prevState;

    if (query !== prevQuery || page !== prevPage) {
      try {
        this.setState({
          isLoading: true,
        });
        const { hits, totalHits } = await fetchImages(query, page);
        const normalHits = hits.map(({ id, largeImageURL, webformatURL, tags }) => ({
          id,
          largeImageURL,
          webformatURL,
          tags,
        }))
        if (query === prevQuery) {
          this.setState({
            totalHits: totalHits,
            articles: [...prevState.articles, ...normalHits],
            isLoading: false,
          });
        } else {
          this.setState({
            isLoading: false,
            articles: [...hits],
          });
        }
        if (page < Math.floor(totalHits / 12)) {
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
    this.setState({ query: value, showBtn: false, page: 1 });
  };

  toggleLargeMode = picData => {
    this.setState(({ showLargePic }) => ({
      showLargePic: !showLargePic,
      picData,
    }));
  };

  handleLoadMore = () => {
    this.setState(p => ({ page: p.page + 1 }));
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
