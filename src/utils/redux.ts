// eslint-disable-next-line no-restricted-imports
import { useSelector as useSelectorOrigin } from 'react-redux';
import { RootState } from 'store';

// eslint-disable-next-line no-restricted-imports
export {useDispatch} from 'react-redux';
// eslint-disable-next-line no-restricted-imports
export { createSlice, createAction, combineReducers } from '@reduxjs/toolkit';
// eslint-disable-next-line no-restricted-imports
export type { PayloadAction } from '@reduxjs/toolkit';

const slicenameCreator = () => {
  if (process.env.NODE_ENV === 'development') {
    const alreadyUsed: Record<string, boolean> = {};
    return (sn: string) => {
      if (alreadyUsed[sn]) throw new Error(`Slice with name "${sn}" already exists`);
      alreadyUsed[sn] = true;
      return sn;
    };
  }
  return (sn: string) => sn;
};
export const createSliceName = slicenameCreator();

export const useSelector = <TSelected>(
  selector: (state: RootState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
): TSelected => useSelectorOrigin(selector, equalityFn);
