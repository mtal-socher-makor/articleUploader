import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Research from '../../Components/Research'
const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated === false) {
          return <Redirect to='/login' />
        } else {
          return <Research {...props} />
        }
      }}
    />
  )
}

export default PrivateRoute
