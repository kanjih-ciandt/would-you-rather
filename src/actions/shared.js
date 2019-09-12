import { setTabPosition} from '../actions/tabPosition'
import { loadQuestions} from '../actions/questions'


export function handleInitialData () {
  return (dispatch) => {
    dispatch(setTabPosition(0))
    dispatch(loadQuestions())
    
  }
} 