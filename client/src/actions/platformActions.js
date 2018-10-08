import { DATE_CHANGED } from './types';

export const setDateRange = (startDate, endDate) => (dispatch) => {
    dispatch(setDateChanged(startDate, endDate));
};

//Date range changed
export const setDateChanged = (startDate, endDate) => {
    return {
        type: DATE_CHANGED,
        payload: {
            startDate: startDate,
            endDate: endDate
        }
    };
};
