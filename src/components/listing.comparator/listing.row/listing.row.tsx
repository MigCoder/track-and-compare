import * as React from 'react'
import { Cell } from '../cell'
import { ListingCell } from '../listing.cell/listing.cell'
import classNames from 'classnames'
import './listing.row.scss'

type Props = {
  rowData: {
    cells: Cell[]
    name: string
  }
  pinned: boolean
  pinRow?: (rowName: string) => void
  unPinRow?: (rowName: string) => void
}

export class ListingRow extends React.Component<Props> {
  public componentDidMount() {
    const {rowData: {name, cells}} = this.props

    const advancedValue = this.getAdvancedCellValue(name, cells)
    if (advancedValue) {
      cells.forEach(cell => {
        if (cell.value === advancedValue) {
          cell.highlight = true
        }
      })
    }

    this.forceUpdate()
  }

  public render() {
    const {rowData: {cells, name}, pinned, pinRow, unPinRow} = this.props

    return (
      <div className='listing-row'>
        <i className={classNames('fa fa-thumbtack', {pinned})}
           title={pinned ? 'Unpin row' : 'Pin row'}
           onClick={() => pinned ? unPinRow!(name) : pinRow!(name)}/>
        <ul>
          {cells.map((cell, key) =>
            <ListingCell key={key} cell={cell}/>)}
        </ul>
      </div>
    )
  }

  private getAdvancedCellValue(name: string, cells: Cell[]) {
    switch (name) {
      case 'size':
        return Math.max(...cells.map(x => x.value))
      case 'price':
        return Math.min(...cells.map(x => x.value))
    }

    return null
  }
}