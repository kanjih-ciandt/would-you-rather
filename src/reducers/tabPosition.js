import { SET_TAB_POSITION } from '../actions/tabPosition'

export default function setTabPosition (state = null, action) {
  switch(action.type) {
    case SET_TAB_POSITION:
        return action.tabPosition
    default:
        return state
    }
}

