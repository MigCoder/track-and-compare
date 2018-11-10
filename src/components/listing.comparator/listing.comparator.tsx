import * as React from 'react'
import classNames from 'classnames'
import { Listing } from '../../models/listing'
import './listing.comparator.scss'
import { ListingColumn } from './listing.column/listing.column'

type Props = {
  visible: boolean
  listings: Listing[]
  onClose: () => void
}

export class ListingComparator extends React.Component<Props> {
  public render() {
    const {visible, onClose, listings} = this.props
    return (
      <div className={classNames('listing-comparator', {visible})}>
        <i className="fa fa-times-circle" onClick={onClose}/>
        <ul>
          {
            listings.map((listing, index) =>
              <ListingColumn key={index} listing={listing} />
            )
          }
        </ul>
      </div>
    )
  }
}
