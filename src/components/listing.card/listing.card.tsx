import * as React from 'react'
import { Listing } from '../../models/listing'
import './listing.card.scss';

type Props = {
  listing: Listing
}

export class ListingCard extends React.Component<Props> {
  public render() {
    const {listing} = this.props

    return (
      <div className='card listing-card'>
        <img src={listing.medias[0]} alt={listing.name}/>
        <div className="info">
          <h3>{listing.name}</h3>
          <div>${listing.price}</div>
        </div>
      </div>
    )
  }
}
