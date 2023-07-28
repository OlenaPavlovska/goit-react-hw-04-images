import propTypes from 'prop-types'
import css from './searchbar.module.css'

export const Searchbar = ({query,onChange,onSubmit}) => {
  

return (
      <header className={css.searchbar}>
        <form onSubmit={onSubmit} className={css.form}>
          <input 
            name="query"
           className={css.input}
            onChange={onChange}
            type="text"
            autocomplete="off"
            autofocus
            value={query}
            placeholder="Search images and photos"
          />
          <button className={css.button} type="submit" >
            <span>Search</span>
          </button>
        </form>
      </header>
    );
}

Searchbar.propTypes = {
  querry: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired
}



