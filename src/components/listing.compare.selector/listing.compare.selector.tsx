import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { Motion, presets, spring } from 'react-motion'
import { Listing } from '../../models/listing'
import { ListingCard } from '../listing.card/listing.card'
import * as interact from 'interactjs'
import './listing.compare.selector.scss'

type Props = {
  listing: Listing
  listingB?: Listing
  expanded: boolean
  onListingBSelected: (listingId: string) => void
  onToggle?: () => void
}

type State = {
  dragging: boolean
  containerHeight: number
  compareCards: Listing[]
}

export class ListingCompareSelector extends React.Component<Props, State> {
  public state = {
    dragging: false,
    containerHeight: 0,
    compareCards: [] as Listing[]
  }

  private containerRef: any

  public componentDidMount() {
    const container = findDOMNode(this.containerRef) as HTMLElement
    this.setState({
      containerHeight: container.getBoundingClientRect().height
    })
    container.style.bottom = `-${container.getBoundingClientRect().height - 50}px`

    interact(container).dropzone({
      overlap: 0.2,
      ondragenter: () => {
        this.setState({dragging: true})
      },
      ondragleave: () => {
        this.setState({dragging: false})
      },
      ondrop: (event) => {
        this.setState({dragging: false})
        this.props.onListingBSelected(event.relatedTarget.getAttribute('listingId'))
      }
    })
  }

  public toggle = () => {
    if (this.props.onToggle) {
      this.props.onToggle()
    }
  }

  public render() {
    const {containerHeight, compareCards} = this.state
    const {expanded} = this.props

    return (
      <Motion style={{offsetY: spring(expanded ? -containerHeight + 50 : 0, presets.wobbly)}}>
        {
          ({offsetY}) =>
            <div className={`listing-compare-selector border border-3`}
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
              <div className='listing-cards d-inline-flex'>
                {
                  [0, 1, 2, 3].map((card, index) =>
                    <ListingCard key={index}
                                 listing={compareCards[index]}
                                 onListingFulfilled={(listing) => {
                                   compareCards[index] = listing
                                   this.forceUpdate()
                                 }}/>)
                }
              </div>
              <button className="btn-large"
                      disabled={compareCards.filter(x => !!x).length < 2}>
                Compare!
              </button>
            </div>
        }
      </Motion>
    )
  }
}
