import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import { RecentViewedListings } from './database/recent.viewed.listings'
import registerServiceWorker from './registerServiceWorker';

RecentViewedListings.init()

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
)

registerServiceWorker();
