
import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View
} from 'react-native';
import MapView from 'react-native-maps';
import image from '../assets/flag-pink.png';

export default class LocationPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            location: {
                latitude: global.locationGPS.latitude,
                longitude: global.locationGPS.longitude
            }
        }
    }
    componentWillMount(){
        this.setState({
            latitude: global.locationGPS.latitude,
            longitude: global.locationGPS.longitude
        });
    }

    render() {
        return (
                <MapView
                renderMarker={renderMarker}
                initialRegion={{
                    latitude: 44.3503,
                    longitude:26.096306,
                    latitudeDelta: 9.22,
                    longitudeDelta: 4.21,
                }}
                style={StyleSheet.absoluteFillObject}>

                <MapView.Marker
                    image={image}
                    size={30}
                    coordinate={this.state.location}
                />
            </MapView>
        );
    }
}

function renderMarker({ location }) {
    return (
        <MapView.Marker
            image={image}
            coordinate={location}
        >
            <MapView.Callout>
                <Text>BiG BiG Callout</Text>
            </MapView.Callout>
        </MapView.Marker>
    );
}