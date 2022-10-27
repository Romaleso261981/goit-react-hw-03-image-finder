// import { Notification } from '../Loader/Loader';

// export const Searchbar = ({isLoading}) => {
//     return <div>
//     <input />
//     {isLoading && <Notification />}
//    </div>;
//   };
  
//   export default Searchbar;
  
 

import { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {SearchBarStyled, SearchForm, SearchInput, ButtonSearch} from './SearchbarStyle.js';

export class SearchBar extends Component {
    render() {
      return (
        <SearchBarStyled>
          <Formik
            initialValues={{ search: '' }}
            onSubmit={(values, actions) => {
            this.props.onSubmit(values.search);
            actions.setSubmitting(false);
          }}
        >
            {({ isSubmitting }) => (
            <SearchForm>
                {isSubmitting && <div>Loading...</div>}
                <ButtonSearch type="submit" className="button" disabled={isSubmitting}></ButtonSearch>
                <SearchInput 
                name="search"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos" /> 
            </SearchForm>
            )}
        </Formik>
        </SearchBarStyled>
      );
    }
    }

export default SearchBar;

    SearchBar.propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };