import classNames from 'classnames'
import * as React from 'react'
import { Listing } from '../../models/listing'
import { Cell } from './cell'
import './listing.comparator.scss'
import { ListingRow } from './listing.row/listing.row'

type Props = {
  visible: boolean
  listings: Listing[]
  onClose: () => void
}

const rows: Array<[keyof Listing, string]> = [
  ['picture', 'Picture'],
  ['name', 'Name'],
  ['size', 'Size'],
  ['price', 'Price'],
  ['address', 'Address'],
  ['developer', 'Developer'],
  ['features', 'Features']
]

type RowData = {
  name: string
  cells: Cell[]
  pinned?: boolean
}

export class ListingComparator extends React.Component<Props> {
  public state: {
    pinnedRows: RowData[]
    allRows: RowData[]
  } = {
    pinnedRows: [],
    allRows: []
  }

  public componentWillReceiveProps() {
    this.setState({
      pinnedRows: [],
      allRows: this.generateRows()
    })
  }

  public pinRow = (rowName: string) => {
    const {pinnedRows = [], allRows = []} = this.state
    const row = allRows.find(x => x.name === rowName)!
    pinnedRows.push(row)
    row.pinned = true
    this.forceUpdate()
  }

  public unPinRow = (rowName: string) => {
    const {pinnedRows = [], allRows = []} = this.state
    const row = allRows.find(x => x.name === rowName)!
    pinnedRows.splice(pinnedRows.indexOf(row), 1)
    row.pinned = false
    this.forceUpdate()
  }

  public render() {
    const {visible, onClose} = this.props
    const {pinnedRows = [], allRows = []} = this.state
    return (
      <div className={classNames('listing-comparator', {visible})}>
        <i className="fa fa-times-circle" onClick={onClose}/>
        <div className='comparator-container'>
          <div className={classNames('pinned-rows', {empty: pinnedRows.length === 0})}>
            {
              pinnedRows.map((row, index) =>
                <ListingRow key={index}
                            rowData={row}
                            pinned={true}
                            unPinRow={this.unPinRow}/>)
            }
          </div>
          <div className='un-pinned-rows'>
            {
              allRows
                .filter(x => !x.pinned)
                .map((row, index) =>
                  <ListingRow key={index}
                              rowData={row}
                              pinned={false}
                              pinRow={this.pinRow}/>)
            }
          </div>
        </div>
      </div>
    )
  }

  private generateRows(): RowData[] {
    const allCells: RowData[] = []

    rows.forEach(([name, label]) => {
      const cells: Cell[] = []
      this.props.listings.forEach(listing => {
        const cell = {
          name,
          label,
          value: listing[name]
        }
        cells.push(cell)
      })
      allCells.push({name, cells})
    })

    return allCells
  }
}