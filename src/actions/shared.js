import { setTabPosition} from '../actions/tabPosition'


export function handleInitialData () {
  return (dispatch) => {
    dispatch(setTabPosition(0))
  }
} 