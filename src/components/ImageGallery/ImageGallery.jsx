import { Gallery, ContactItem } from './ImageGalleryStyle.js';

export const ArticleList = ({ articles, toggleLargeMode }) => (
  <Gallery>
    {articles.map(({ largeImageURL, id, user }) => (
      <ContactItem
        key={id}
      >
        <img alt={user} src={largeImageURL} onClick={() => {
          toggleLargeMode(largeImageURL, user)
        }}/>
      </ContactItem>
    ))}
  </Gallery>
);

export default ArticleList;
