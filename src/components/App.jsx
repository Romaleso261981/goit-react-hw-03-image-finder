import { Component } from 'react';
import axios from 'axios';
import { Gallery, ContactItem } from "./GlobalStyle";

axios.defaults.baseURL = "https://pixabay.com/api/";


const ArticleList = ({ articles }) => (
  <Gallery>
    {articles.map(({ previewURL, id, user }) => (
      <ContactItem key={id}>
        <img alt={user} src={previewURL} />
      </ContactItem>
    ))}
  </Gallery>
);

class App extends Component {
  state = {
    articles: [],
  };

  async componentDidMount() {
    const response = await axios.get("?key=29683186-89d5b8f18ccbe7d45b5194d45&q=yellow+flowers&image_type=photo");
    console.log(response.data.hits);
    this.setState({ articles: response.data.hits });
  }

  render() {
    const { articles } = this.state;
    return (
      <div>
        <ArticleList articles={articles} />
      </div>
    );
  }
}

export default App;










































// import { Component } from 'react';
// import axios from 'axios';
// import Notification from './Loader/Loader';
// import ImageGalleryItem from './ImageGallery/ImageGallery';

// axios.defaults.baseURL = "https://hn.algolia.com/api/v1";


// export class App extends Component {
//   state = {
//     isLoading: true,
//     page: 1,
//     data: [],
//     total: 0, 
//     pages: 20,
//     error: '',
//     query: '',
//     showLargePic: false,
//     picData: {},
//   };


//   async componentDidMount() {
//     const response = await axios.get("/search?query=react");
//     console.log(response);
//     this.setState({ data: response.data.hits });
//   }
//   // async componentDidUpdate(prevProps, prevState) {
//   //   console.log(prevState);
//   //   const { query, page } = this.state;
//   //   const { query: prevQuery, page: prevPage } = prevState;

//   //   if (query !== prevQuery || (page !== prevPage && page !== 1)) {
//   //     try {
//   //       this.setState({ isLoading: true });
//   //       const data = await axios.get(
//   //         `videos/?key=29683186-89d5b8f18ccbe7d45b5194d45&q=yellow+flowers`
//   //       );
//   //       console.log(data);
//   //       const { total, hits } = data;

//   //       const properStructHits = hits.map(
//   //         ({ id, largeImageURL, webformatURL, tags }) => ({
//   //           id,
//   //           largeImageURL,
//   //           webformatURL,
//   //           tags,
//   //         })
//   //       );

//   //       if (query !== prevQuery) {
//   //         this.setState({
//   //           data: [...properStructHits],
//   //           total: total,
//   //           isLoading: false,
//   //         });
//   //       } else {
//   //         this.setState(p => ({
//   //           data: [...p.data, ...properStructHits],
//   //           isLoading: false,
//   //         }));
//   //       }
//   //     } catch (error) {
//   //       this.setState({ error: true, isLoading: false });
//   //       console.log(error);
//   //     }
//   //   }
//   // }

//   setQuery = value => {
//     this.setState({ query: value });
//   };

//   toggleLargeMode = picData => {
//     this.setState(({ showLargePic }) => ({
//       showLargePic: !showLargePic,
//       picData,
//     }));
//   };

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
          
//         )}
        
//         {/* {data.length > 0 && page < pages (
//           <button type="button" onClick={(e)=>{console.log(e)}}>
//           Load more
//           </button>
//         )} */}
//       </>
//     );
//   }
// }

// export default App;





