export const CURRENT_QUESTION = 'CURRENT_QUESTION'


export function setCurrentQuestion (targetQuestion) {
  return {
    type: CURRENT_QUESTION,
    targetQuestion,
  }
} 
