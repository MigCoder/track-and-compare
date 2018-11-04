import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { Motion, presets, spring } from 'react-motion'
import { Listing } from '../../models/listing'
import { ListingCard } from '../listing.card/listing.card'
import classNames from 'classnames'
import './track.container.scss'

type Props = {
  expanded: boolean
  recentViewedListings: Listing[]
  onToggle?: () => void
  toggleDragging?: (dragging: boolean) => void
}

type State = {
  containerHeight: number
  draggingListing: boolean
}

export class TrackContainer extends React.Component<Props, State> {

  public state = {
    expanded: false,
    containerHeight: 0,
    draggingListing: false
  }

  private containerRef: any

  public componentDidMount() {
    const container = findDOMNode(this.containerRef) as HTMLElement
    this.setState({
      containerHeight: container.getBoundingClientRect().height
    })
  }

  public toggle = () => {
    if (this.props.onToggle) {
      this.props.onToggle()
    }
  }

  public onDragStart = () => {
    const cardsContainer = (findDOMNode(this.containerRef) as HTMLElement)
      .querySelector('.listing-cards') as HTMLElement
    cardsContainer.style.transform = `translateX(${-cardsContainer.scrollLeft}px)`
    this.setState({draggingListing: true})
    if (this.props.toggleDragging) {
      this.props.toggleDragging(true)
    }
  }

  public onDragEnd = () => {
    this.setState({draggingListing: false})
    const cardsContainer = (findDOMNode(this.containerRef) as HTMLElement)
      .querySelector('.listing-cards') as HTMLElement
    cardsContainer.style.transform = `translateX(0px)`
    if (this.props.toggleDragging) {
      this.props.toggleDragging(false)
    }
  }

  public render() {
    const {containerHeight, draggingListing} = this.state
    const {expanded, recentViewedListings = []} = this.props
    return (
      <Motion style={{offsetY: spring(expanded ? 0 : -containerHeight + 50, presets.wobbly)}}>
        {
          ({offsetY}) =>
            <div className='track-container border border-3'
                 style={{transform: `translateY(${offsetY}px)`}}
                 ref={ref => this.containerRef = ref}>
              <h2>Your track</h2>
              <div className={classNames('listing-cards', 'd-inline-flex', 'flex-nowrap', {
                dragging: draggingListing
              })}>
                {
                  recentViewedListings.map((listing, index) =>
                    <ListingCard key={index}
                                 listing={listing}
                                 draggable={true}
                                 onDragStart={this.onDragStart}
                                 onDragEnd={this.onDragEnd}/>
                  )
                }
              </div>
              <div className='switcher'>
                <Motion style={{angel: spring(expanded ? 0 : 180, presets.wobbly)}}>
                  {
                    ({angel}) =>
                      <i className='fa fa-arrow-circle-up'
                         style={{transform: `rotate(${angel}deg)`}}
                         onClick={this.toggle}/>
                  }
                </Motion>
              </div>
            </div>
        }
      </Motion>
    )
  }
}
