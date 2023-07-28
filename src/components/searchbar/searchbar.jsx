import propTypes from 'prop-types'
import css from './searchbar.module.css'
import { useState } from 'react'

export const Searchbar = ({onSubmit}) => {
  const [query, setQuery] = useState('')
  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(query)
  }
return (
      <header className={css.searchbar}>
        <form onSubmit={handleSubmit} className={css.form}>
          <input 
            name="query"
           className={css.input}
            onChange={e=>setQuery(e.target.value)}
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



