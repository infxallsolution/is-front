import { combineReducers } from 'redux'
import theme from './slices/themeSlice'
import auth from './slices/authSlice'
import navigationSlice from './slices/navigationSlice'
import companySlice from './slices/companySlice'

const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        theme,
        auth,
        navigationSlice,
        companySlice,
        ...asyncReducers,
    })
    return combinedReducer(state, action)
}
  
export default rootReducer
