import { Provider } from 'react-redux'
import { store } from './redux/store'
import Navigator from './Navigator'

function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  )
}

export default App
