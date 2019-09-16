import { setTabPosition} from '../actions/tabPosition'
import { loadQuestions} from '../actions/questions'
import { handleLoadUsers} from '../actions/users'


export function handleInitialData () {
  return (dispatch) => {
    dispatch(setTabPosition(0))
    dispatch(loadQuestions())
    dispatch(handleLoadUsers())
    
  }
} 