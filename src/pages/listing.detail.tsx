import * as React from 'react'
import { match } from 'react-router'
import { Link } from 'react-router-dom'
import { convertNameToUrl } from '../common/helper'
import { RecentViewedListings } from '../database/recent.viewed.listings'
import { TestData } from '../database/test.data'
import { Listing } from '../models/listing'
import { FakeMap } from '../components/map/fake.map'
import './listing.detail.scss'

type Props = {
  match?: match<{ name: string }>
}

type State = {
  listing: Listing,
}

export class ListingDetail extends React.Component<Props, State> {
  public state = {
    listing: new Listing()
  }

  public componentWillMount() {
    const listing = TestData.find(x => convertNameToUrl(x.name) === this.props.match!.params.name)!
    this.setState({listing})
    RecentViewedListings.push(listing)
  }

  public componentDidMount() {
    document.body.scrollTo(0, 0)
  }

  public componentWillReceiveProps(nextProps: Props){
    if(nextProps.match!.params.name !== this.props.match!.params.name) {
      const listing = TestData.find(x => convertNameToUrl(x.name) === nextProps.match!.params.name)!
      this.setState({listing})
    }
  }

  public render() {
    const {listing} = this.state
    return (
      <div className='listing-detail'>
        <Link to='/'>
          <button className="paper-btn">{'< Back'}</button>
        </Link>
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
      </div>
    )
  }
}
