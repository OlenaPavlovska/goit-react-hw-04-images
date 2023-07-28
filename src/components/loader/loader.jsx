import {Audio} from 'react-loader-spinner'
import propTypes from 'prop-types'

export const Loader = ({render }) => {
    return (
        <Audio
            visible={render}
            height="80"
  width="80"
  radius="9"
  color="black"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
        />
    )
}

Loader.propTypes = {
    render: propTypes.bool.isRequired
}