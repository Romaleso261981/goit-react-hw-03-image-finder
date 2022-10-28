import { Gallery, ContactItem, Info } from './ImageGalleryStyle.js';

export const ArticleList = ({ articles, toggleLargeMode, page,  }) => (
  <Gallery>
    {articles.map(({ largeImageURL, id, user, previewURL, totalHits, page}) => (
      <ContactItem
        key={id}
      >
        <Info>
          <span>{totalHits}</span>
          <span>{page}</span>
          <span>{(Math.floor(totalHits / 20))}</span>
        </Info>
        <img alt={user} src={previewURL} onClick={() => {
          toggleLargeMode(largeImageURL, user)
        }}/>
      </ContactItem>
    ))}
  </Gallery>
);

export default ArticleList;
