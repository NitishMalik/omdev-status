import { DATE_CHANGED } from '../actions/types';

const initialState = {
    startDate: null,
    endDate: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case DATE_CHANGED:
            return {
                ...state,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate
            };
        default:
            return state;
    }
}