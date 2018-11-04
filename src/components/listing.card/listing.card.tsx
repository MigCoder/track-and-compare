import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { Listing } from '../../models/listing'
import './listing.card.scss'
import * as interact from 'interactjs'

type Props = {
  draggable?: boolean
  listing?: Listing
  onDragStart?: () => void
  onDragEnd?: (listing?: Listing) => void
}

export class ListingCard extends React.Component<Props> {
  private cardRef: any

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
          },
          onmove: dragMoveListener,
        })
    }
  }

  public render() {
    const {listing} = this.props

    if (listing) {
      return (
        <div className='card listing-card' ref={ref => this.cardRef = ref}>
          <img src={listing.medias[0]} alt={listing.name}/>
          <div className="info">
            <h3>{listing.name}</h3>
            <div>${listing.price}</div>
          </div>
        </div>
      )
    } else {
      return (
        <div className='listing-card-place-holder border-dashed border-thick'>
          Drop here to compare
        </div>
      )
    }
  }
}
