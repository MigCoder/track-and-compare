import * as React from 'react'
import { ListingItem } from '../components/listing.item/listing.item'
import { TestData } from '../database/test.data'
import './listings.scss'

export class Listings extends React.Component {
  public render() {
    return (
      <div className='listings'>
        <div className="filters">
          <select>
            <option value="1">Property Type</option>
          </select>
          <select>
            <option value="1">Size</option>
          </select>
          <select>
            <option value="1">Price</option>
          </select>
        </div>
        {TestData.map((listing, index) =>
          <ListingItem key={index} listing={listing}/>)}
      </div>
    )
  }
}
