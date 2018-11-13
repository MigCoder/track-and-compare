import { ReactNode } from 'react'
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
    let labelElement: ReactNode = <div className="label">{cell.label}</div>
    let valueElement: ReactNode = <div className='value'>{cell.value}</div>
    switch (cell.name) {
      case 'picture':
        labelElement = ''
        valueElement = <img src={cell.value} alt={cell.name}/>
        break
      case 'size':
        valueElement = <div className='value'>{cell.value}ft²</div>
        break
      case 'price':
        valueElement = <div className='value'>${cell.value}</div>
        break
      case 'features':
        valueElement = <div className='value'>{
          cell.value.map((feature: string, index: number) =>
            <span key={index} className="tag"
                  style={{background: this.getTagColor(index)}}>
            {feature}
            </span>
          )}</div>
        break
    }

    return (
      <li className={classes}>
        {labelElement}
        {valueElement}
      </li>
    )
  }

  private getTagColor(index: number) {
    const colors = [
      '#fad24c',
      '#c0d84e',
      '#ff8f47',
      '#dc4230',
      '#9bb5d9'
    ]

    return colors[index % colors.length]
  }
}
