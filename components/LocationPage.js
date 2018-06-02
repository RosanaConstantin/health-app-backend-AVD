
import React, { Component } from 'react';
import {
    Text,
    StyleSheet
} from 'react-native';
import MapView from 'react-native-maps';
import image from '../assets/flag-pink.png';

export default class LocationPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            location: {
                latitude: 44.436639,
                longitude: 26.018673
            }
        }
    }
    render() {
        return (
            <MapView
                renderMarker={renderMarker}
                initialRegion={{
                    longitude:26.096306,
                    latitudeDelta: 9.22,
                    longitudeDelta: 4.21,
                }}
                style={StyleSheet.absoluteFillObject}>

               <MapView.Marker
                   image={image}
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