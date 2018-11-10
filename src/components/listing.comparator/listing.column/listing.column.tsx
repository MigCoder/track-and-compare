import * as React from 'react'
import { Listing } from '../../../models/listing'

type Props = {
  listing: Listing
}

export class ListingColumn extends  React.Component<Props> {
  public render(){
    const { listing } = this.props
    return (
      <li>
        {listing.name}
      </li>
    )
  }
}
