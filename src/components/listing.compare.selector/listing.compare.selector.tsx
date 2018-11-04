import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { Motion, presets, spring } from 'react-motion'
import { Listing } from '../../models/listing'
import { ListingCard } from '../listing.card/listing.card'
import './listing.compare.selector.scss'

type Props = {
  listing: Listing
  expanded: boolean
  onToggle?: () => void
}

type State = {
  listingB?: Listing
  containerHeight: number
}

export class ListingCompareSelector extends React.Component<Props, State> {
  public state = {
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
    const {listing, expanded} = this.props

    return (
      <Motion style={{offsetY: spring(expanded ? -containerHeight + 50 : 0, presets.wobbly)}}>
        {
          ({offsetY}) =>
            <div className='listing-compare-selector border border-3'
                 style={{transform: `translateY(${offsetY}px)`}}
                 ref={ref => this.containerRef = ref}>
              <h2>Compare listing</h2>
              <div className='switcher'>
                <Motion style={{angel: spring(expanded ? 0 : 180, presets.wobbly)}}>
                  {
                    ({angel}) =>
                      <i className='fa fa-arrow-circle-down'
                         style={{transform: `rotate(${angel}deg)`}}
                         onClick={this.toggle}/>
                  }
                </Motion>
              </div>
              <div className='listing-cards d-inline-flex flex-nowrap'>
                {
                  <ListingCard listing={listing}/>
                }
              </div>
            </div>
        }
      </Motion>
    )
  }
}
