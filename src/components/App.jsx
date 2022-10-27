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

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state; 
    const { query: prevQuery, page: prevPage } = prevState; 

    console.log(query);
    console.log(prevQuery);
    console.log(query !== prevQuery);

    if (query !== prevQuery) {
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
    console.log(value);
    this.setState({ query: value, showBtn: false });
    console.log(this.state.query);
  };  

  // handleSubmit = e => {
  //   console.log(e.target.alements.search.value);
  //   e.preventDefault();
  //   this.setState({ page: 1, query: e.target.alements.search.value });
  // };

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
        {showLargePic && (
          <Modal articles={picData} toggleLargeMode={this.toggleLargeMode} />
        )}
      </AppStyled>
    );
  }
}

export default App;

//   handleLoadMore = () => {
//     this.setState(p => ({ page: p.page + 1 }));
//   };
