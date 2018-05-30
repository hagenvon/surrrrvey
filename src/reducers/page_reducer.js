
import {PAGE_NAVIGATION} from "../_constants/actionTypes";

const page = (state = {}, action)=>{
    switch (action.type) {
        case PAGE_NAVIGATION:
            return {
                ...state,
                current: action.newPage ,
                direction: action.direction
            };
        default:
            return state;
    }
};

export default page;
