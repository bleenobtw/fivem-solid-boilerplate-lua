/* @refresh reload */
import { render } from 'solid-js/web'

import './index.css'
import App from './components/App'
import { VisibilityProvider } from './providers/VisibilityProvider'

const root = document.getElementById('root')

render(() => <VisibilityProvider>
  <App />
</VisibilityProvider>, root!)
