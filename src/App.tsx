import './index.scss'
import * as React from 'react'
import { TestData } from './database/test.data'
import { ListingDetail } from './pages/listing.detail'

class App extends React.Component {
  public render() {
    return (
      <div className="App container-fluid">
        <ListingDetail listing={TestData[0]}
                       recentViewedListings={TestData}/>
      </div>
    )
  }
}

export default App
