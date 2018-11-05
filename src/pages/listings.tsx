import * as React from 'react'
import { ListingItem } from '../components/listing.item/listing.item'
import { Listing } from '../models/listing'

type Props = {
  listings: Listing[]
}

export class Listings extends React.Component<Props> {
  public render() {
    const {listings} = this.props

    return (
      listings.map((listing, index) =>
        <ListingItem key={index} listing={listing}/>)
    )
  }
}
