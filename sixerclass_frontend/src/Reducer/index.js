import { combineReducers } from 'redux';
import folder from './folderReducer';
import img from './imgReducer';

const appReducer = combineReducers({
    folder,
    img
})

const rootReducer = ( state, action ) => {
    return appReducer(state, action)
}

export default rootReducer;