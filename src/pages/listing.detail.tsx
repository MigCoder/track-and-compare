import * as React from 'react'
import { ListingCompareSelector } from '../components/listing.compare.selector/listing.compare.selector'
import { TrackContainer } from '../components/track.container/track.container'
import { Listing } from '../models/listing'
import classNames from 'classnames'
import { FakeMap } from '../components/map/fake.map'
import './listing.detail.scss'

type Props = {
  listing: Listing,
  recentViewedListings: Listing[]
}

type State = {
  trackContainerVisible: boolean
  compareSelectorVisible: boolean
}

export class ListingDetail extends React.Component<Props, State> {
  public state = {
    trackContainerVisible: false,
    compareSelectorVisible: false
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
    const {listing, recentViewedListings} = this.props
    return (
      <div className='listing-detail'>
        <img src={listing.medias![0]} alt={listing.name}/>
        <div className='detail-container'>
          <div className='basic-info'>
            <h1>{listing.name}</h1>
            <div>Price: ${listing.price}</div>
            <div>Size: {listing.size || '-'}ft²</div>
            <p>
              <i className='fa fa-map-marker-alt'/>
              {listing.address}
            </p>
            <div>
              <i className='fa fa-building'/>
              {listing.developer}
            </div>
          </div>
          <div className='contact-agent'>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" placeholder="Name" id="name"
                     autoComplete="off"/>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" placeholder="Email" id="email"
                     autoComplete="off"/>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="text" placeholder="Phone" id="phone"
                     autoComplete="off"/>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea placeholder="Message" id="message"
                        autoComplete="off"/>
            </div>
            <button className="btn-block">Send enquiry</button>
          </div>
        </div>
        <FakeMap/>
        <div className={classNames('mask', {show: trackContainerVisible || compareSelectorVisible})}/>
        <TrackContainer recentViewedListings={recentViewedListings}
                        expanded={trackContainerVisible}
                        onToggle={this.toggleTrackContainer}/>
        <ListingCompareSelector
          listing={listing}
          expanded={compareSelectorVisible}
          onToggle={this.toggleCompareSelector}/>
      </div>
    )
  }
}
