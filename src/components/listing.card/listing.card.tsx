import * as React from 'react'
import classNames from 'classnames'
import { findDOMNode } from 'react-dom'
import { Link } from 'react-router-dom'
import { convertNameToUrl } from '../../common/helper'
import { getListingByName } from '../../database/test.data'
import { Listing } from '../../models/listing'
import './listing.card.scss'
import * as interact from 'interactjs'

type Props = {
  draggable?: boolean
  listing?: Listing
  onDragStart?: () => void
  onDragEnd?: (listing?: Listing) => void
  onListingFulfilled?: (listing: Listing) => void
  onListingClear?: () => void
}

type State = {
  dragActive: boolean
  dragging: boolean
}

export class ListingCard extends React.Component<Props, State> {

  public state = {
    dragActive: false,
    dragging: false
  }
  private cardRef: any
  private cardPlaceholderRef: any

  public componentDidMount() {
    if (this.cardRef && this.props.draggable) {
      const dragMoveListener = (event: any) => {
        const target = event.target
        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

        target.style.transform =
          'translate(' + x + 'px, ' + y + 'px)'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
      }

      const card = findDOMNode(this.cardRef) as HTMLElement
      interact(card)
        .draggable({
          restrict: {
            endOnly: true,
            elementRect: {top: 0, left: 0, bottom: 1, right: 1}
          },
          autoScroll: true,
          onstart: () => {
            if (this.props.onDragStart) {
              this.props.onDragStart()
            }
            card.setAttribute('listingId', this.props.listing!.name)
            card.style.zIndex = '9999'
            card.style.transition = `none`
            this.setState({dragging: true})
          },
          onend: () => {
            setTimeout(() => {
              if (this.props.onDragEnd) {
                this.props.onDragEnd(this.props.listing)
              }
            }, 400)
            card.style.zIndex = '0'
            card.style.transform = `translate(0, 0)`
            card.style.transition = `all .3s`
            card.setAttribute('data-x', '0')
            card.setAttribute('data-y', '0')
            setTimeout(() => {
              this.setState({dragging: false})
            })
          },
          onmove: dragMoveListener,
        })
    }

    const cardPlaceholder = findDOMNode(this.cardPlaceholderRef) as HTMLElement
    if (cardPlaceholder) {
      interact(cardPlaceholder).dropzone({
        overlap: 0.2,
        ondragenter: () => {
          this.setState({dragActive: true})
        },
        ondragleave: () => {
          this.setState({dragActive: false})
        },
        ondrop: (event) => {
          this.setState({dragActive: false})
          if (this.props.onListingFulfilled) {
            const listing = getListingByName(event.relatedTarget.getAttribute('listingId'))
            this.props.onListingFulfilled(listing)
          }
        }
      })
    }
  }

  public render() {
    const {dragActive} = this.state
    const {listing, draggable} = this.props

    if (listing && !dragActive) {
      const classNames = `card listing-card`

      const container = draggable ?
        <Link className={classNames}
              to={convertNameToUrl(`/listings/${listing.name}`)}
              ref={ref => this.cardRef = ref}
              onClick={(event) => this.state.dragging && event.preventDefault()}/> :
        <div className={classNames} ref={ref => this.cardRef = ref}/>
      return React.cloneElement(container, {
        children: <React.Fragment>
          {
            !draggable &&
            <i className='fa fa-times-circle'
               onClick={() => this.props.onListingClear!()}/>
          }
          <img src={listing.picture} alt={listing.name}/>
          <div className="info">
            <h3>{listing.name}</h3>
            <div>${listing.price}</div>
          </div>
        </React.Fragment>
      })
    } else {
      return (
        <div className={classNames('listing-card-place-holder border-dashed border-thick', {
          'drag-active': dragActive
        })}
             ref={ref => this.cardPlaceholderRef = ref}>
          Drop here to compare
        </div>
      )
    }
  }
}
