import * as React from 'react'
import { Link } from 'react-router-dom'
import { convertNameToUrl } from '../../common/helper'
import { Listing } from '../../models/listing'
import './listing.item.scss'

type Props = {
  listing: Listing
}

export class ListingItem extends React.Component<Props> {
  public render() {
    const {listing} = this.props

    return (
      <Link className='listing-item border border-4 shadow shadow-hover'
      to={convertNameToUrl(`listings/${listing.name}`)}>
        <img src={listing.medias[0]} alt={listing.name}/>
        <div className="info">
          <h2>{listing.name}</h2>
          <div>Size: {listing.size}ft²</div>
          <div>Budget: ${listing.price}</div>
        </div>
      </Link>
    )
  }
}
