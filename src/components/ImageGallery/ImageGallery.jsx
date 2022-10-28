import { Gallery, ContactItem } from './ImageGalleryStyle.js';

export const ArticleList = ({ articles, toggleLargeMode }) => (
  <Gallery>
    {articles.map(({ largeImageURL, id, user, previewURL }) => (
      <ContactItem
        key={id}
      >
        <img alt={user} src={previewURL} onClick={() => {
          toggleLargeMode(largeImageURL, user)
        }}/>
      </ContactItem>
    ))}
  </Gallery>
);

export default ArticleList;
