const initialState = { user: JSON.parse(localStorage.getItem('user')) }

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.user }
    default:
      return state
  }
}
