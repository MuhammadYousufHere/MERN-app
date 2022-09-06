import { authReducer } from './authSlice';
import { postReducer } from './postSlice';
import { profileReducer } from './profileSlice';

const rootReducer = {
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        post: postReducer,
    },
};
export default rootReducer;
