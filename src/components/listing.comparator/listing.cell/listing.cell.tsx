import * as React from 'react'
import './listing.cell.scss'
import { Cell } from '../cell'
import classNames from 'classnames'

type Props = {
  cell: Cell
}

export class ListingCell extends React.Component<Props> {
  public render() {
    const {cell} = this.props
    const classes = classNames('listing-cell', {highlight: cell.highlight})
    switch (cell.name) {
      case 'picture':
        return (
          <li className={classes}>
            <img src={cell.value} alt={cell.name}/>
          </li>
        )
      default:
        return (
          <li className={classes}>
            <div>
              {cell.label}
            </div>
            <div>
              {cell.value}
            </div>
          </li>
        )
    }
  }
}
