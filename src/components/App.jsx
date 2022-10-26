import { Component } from 'react';
import axios from 'axios';
import { Gallery, ContactItem } from './GlobalStyle';
import { Button } from './Button/Button';
import { AppStyled } from './AppStyle';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '29683186-89d5b8f18ccbe7d45b5194d45'

const ArticleList = ({ articles }) => (
  <Gallery>
    {articles.map(({ previewURL, id, user, webformatURL }) => (
      <ContactItem key={id}>
        <img alt={user} src={webformatURL} />
        {/* <Title>{user}</Title> */}
      </ContactItem>
    ))}
  </Gallery>
);

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
        const { total, hits} = data;

        if (query !== 0|| (page !== 1)) {
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
    console.log(this.state.query);
  };

  toggleLargeMode = () => {
    console.log('toggleLargeMode');
  };

    handleLoadMore = () => {
      this.setState(p => ({ page: p.page + 1 }));
      console.log(this.state.page);
  };

  render() {
    const { articles, showBtn,} = this.state;
    return (
      <AppStyled>
        <div>
          <input onSubmit={this.setQuery} />
        </div>
        <ArticleList articles={articles} />
        {showBtn && <Button
          onClick={e => {
            this.handleLoadMore();
          }}
        />}
      </AppStyled>
    );
  }
}

export default App;

//   // async componentDidUpdate(prevProps, prevState) {
//   //   console.log(prevState);
//   //   const { query, page } = this.state;
//   //   const { query: prevQuery, page: prevPage } = prevState;

//   if (query !== prevQuery || (page !== prevPage && page !== 1)) {
//     try {
//       this.setState({ isLoading: true });
//       const data = await axios.get(
//         `videos/?key=29683186-89d5b8f18ccbe7d45b5194d45&q=yellow+flowers`
//       );
//       console.log(data);
//       const { total, hits } = data;

//       const properStructHits = hits.map(
//         ({ id, largeImageURL, webformatURL, tags }) => ({
//           id,
//           largeImageURL,
//           webformatURL,
//           tags,
//         })
//       );

//       if (query !== prevQuery) {
//         this.setState({
//           data: [...properStructHits],
//           total: total,
//           isLoading: false,
//         });
//       } else {
//         this.setState(p => ({
//           data: [...p.data, ...properStructHits],
//           isLoading: false,
//         }));
//       }
//     } catch (error) {
//       this.setState({ error: true, isLoading: false });
//       console.log(error);
//     }
//   }
// }

//   handleLoadMore = () => {
//     this.setState(p => ({ page: p.page + 1 }));
//   };

//   render() {
//     const { data, isLoading, page, pages} = this.state;

//     return (
//       <>
//         <input onSubmit={this.setQuery} />
//         {data.length > 0 && (
//           <ImageGalleryItem articles={data} />
//         )}
//         {isLoading && (<Notification />
