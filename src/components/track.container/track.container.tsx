import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { Motion, presets, spring } from 'react-motion'
import { Listing } from '../../models/listing'
import { ListingCard } from '../listing.card/listing.card'
import './track.container.scss'

type Props = {
  expanded: boolean
  recentViewedListings: Listing[]
  onToggle?: () => void
}

type State = {
  containerHeight: number
}

export class TrackContainer extends React.Component<Props, State> {

  public state = {
    expanded: false,
    containerHeight: 0
  }

  private containerRef: any;

  public componentDidMount(){
    const container = findDOMNode(this.containerRef) as HTMLElement;
    this.setState({
      containerHeight: container.getBoundingClientRect().height
    })
  }

  public toggle = () => {
    if (this.props.onToggle) {
      this.props.onToggle()
    }
  }

  public render() {
    const {containerHeight} = this.state
    const {expanded, recentViewedListings = []} = this.props
    return (
      <Motion style={{offsetY: spring(expanded ? 0 : -containerHeight + 50, presets.wobbly)}}>
        {
          ({offsetY}) =>
            <div className='track-container border border-3'
                 style={{transform: `translateY(${offsetY}px)`}}
                 ref={ref => this.containerRef = ref}>
              <h2>Your track</h2>
              <div className='listing-cards d-inline-flex flex-nowrap'>
                {
                  recentViewedListings.map((listing, index) =>
                    <ListingCard key={index} listing={listing}/>
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
