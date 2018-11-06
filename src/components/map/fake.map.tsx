import * as React from 'react'
import GoogleMapReact, { Coords } from 'google-map-react'

const AnyReactComponent = ({text}: { text: string }) => <div>{text}</div>

type Props = {
  center: Coords,
  zoom: number
}

export class FakeMap extends React.Component<Props> {
  public static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  }

  public render() {
    return (
      <div style={{height: '200px', width: '100%', zIndex: -1}}>
        <GoogleMapReact
          key='AIzaSyBMqz4ueWMfGGqdXlvwE_cIVfar60GROi8'
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>
      </div>
    )
  }
}
