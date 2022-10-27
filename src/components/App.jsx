import { Component } from 'react';
import axios from 'axios';
import { Button } from './Button/Button';
import { ArticleList } from './ImageGallery/ImageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { AppStyled } from './AppStyle';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '29683186-89d5b8f18ccbe7d45b5194d45';

class App extends Component {
  state = {
    isLoading: true,
    page: 1,
    articles: [],
    total: 0,
    pages: 20,
    error: '',
    query: '',
    showLargePic: false,
    showBtn: false,
    picData: {},
  };

  async componentDidMount() {
    const { page, query } = this.state;
    // const { query: prevQuery, page: prevPage } = prevState;

    if (true) {
      try {
        this.setState({
          isLoading: true,
        });
        const response = await axios.get(
          `?key=${KEY}&q=${query}&image_type=photo`
        );

        const { data } = response;
        const { total, hits } = data;

        if (query !== 0 || page !== 1) {
          this.setState({
            articles: hits,
            total: total,
            isLoading: false,
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
  }

  setQuery = value => {
    this.setState({ query: value });
  };

  toggleLargeMode = picData => {
    this.setState(({ showLargePic }) => ({
      showLargePic: !showLargePic,
      picData,
    }));
  };

  handleLoadMore = () => {
    this.setState(p => ({ page: p.page + 1 }));
    console.log(this.state.page);
  };

  render() {
    const { articles, showBtn, showLargePic, picData } = this.state;
    console.log(picData);
    return (
      <AppStyled>
        <SearchBar onSubmit={this.setQuery} />
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
        {showLargePic && <Modal articles={picData} toggleLargeMode={this.toggleLargeMode } />}
      </AppStyled>
    );
  }
}

export default App;

//   handleLoadMore = () => {
//     this.setState(p => ({ page: p.page + 1 }));
//   };
