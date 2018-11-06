import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { Motion, presets, spring } from 'react-motion'
import { Subscription } from 'rxjs'
import { RecentViewedListings } from '../../database/recent.viewed.listings'
import { Listing } from '../../models/listing'
import { ListingCard } from '../listing.card/listing.card'
import classNames from 'classnames'
import './track.container.scss'

type Props = {
  expanded: boolean
  onToggle?: () => void
  toggleDragging?: (dragging: boolean) => void
}

type State = {
  recentViewedListings: Listing[]
  containerHeight: number
  draggingListing: boolean
}

export class TrackContainer extends React.Component<Props, State> {
  public state = {
    expanded: false,
    containerHeight: 0,
    draggingListing: false,
    recentViewedListings: []
  }

  private containerRef: any
  private subscription: Subscription

  public componentDidMount() {
    const container = findDOMNode(this.containerRef) as HTMLElement
    this.setState({
      containerHeight: container.getBoundingClientRect().height
    })
    this.subscription = RecentViewedListings.listings
      .subscribe(listings => this.setState({recentViewedListings: listings}))
  }

  public componentWillUnmount() {
    this.subscription.unsubscribe()
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
    const {draggingListing, recentViewedListings} = this.state
    const {expanded} = this.props
    return (
      <Motion style={{
        offsetY: spring(expanded ? 0 : -85, presets.wobbly)
      }}>
        {
          ({offsetY}) =>
            <div className='track-container border border-3'
                 style={{transform: `translateY(${offsetY}%)`}}
                 ref={ref => this.containerRef = ref}>
              <div className='d-flex justify-content-between'>
                <h2>Your track</h2>
                <button onClick={RecentViewedListings.clear}>Clear</button>
              </div>
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
