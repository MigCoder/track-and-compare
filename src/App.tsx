import './index.scss'
import classNames from 'classnames'
import * as React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { ListingCompareSelector } from './components/listing.compare.selector/listing.compare.selector'
import { TrackContainer } from './components/track.container/track.container'
import { ListingDetail } from './pages/listing.detail'
import { Listings } from './pages/listings'

type State = {
  trackContainerVisible: boolean
  compareSelectorVisible: boolean
}

class App extends React.Component<any, State> {
  public state = {
    trackContainerVisible: false,
    compareSelectorVisible: false,
  }

  public toggleTrackContainer = () => {
    this.setState({
      trackContainerVisible:
        !this.state.trackContainerVisible
    })
  }

  public toggleCompareSelector = () => {
    const compareSelectorVisible = !this.state.compareSelectorVisible
    if (compareSelectorVisible) {
      this.setState({
        trackContainerVisible: true
      })
    }
    this.setState({
      compareSelectorVisible
    })
  }

  public render() {
    const {trackContainerVisible, compareSelectorVisible} = this.state
    return (
      <BrowserRouter>
        <div className="App container-fluid">
          <Route exact={true} path="/"
                 component={Listings}/>
          <Route path="/listings/:name" component={ListingDetail}/>
          <div className={classNames('mask', {show: trackContainerVisible || compareSelectorVisible})}
               onClick={() => {
                 this.setState({
                   trackContainerVisible: false,
                   compareSelectorVisible: false
                 })
               }}/>
          <TrackContainer expanded={trackContainerVisible}
                          onToggle={this.toggleTrackContainer}/>
          <ListingCompareSelector
            expanded={compareSelectorVisible}
            onToggle={this.toggleCompareSelector}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
