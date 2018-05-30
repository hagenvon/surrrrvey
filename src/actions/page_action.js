import {PAGE_NAVIGATION} from "../_constants/actionTypes";

export const navigateToPage = (newPage, direction) => {
    return {
        type: PAGE_NAVIGATION,
        newPage,
        direction
    }
};
