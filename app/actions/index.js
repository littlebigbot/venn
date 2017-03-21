import { createActionAsync } from 'redux-act-async';
import { callSearch } from '../api';

export const search = createActionAsync('SEARCH', callSearch);
