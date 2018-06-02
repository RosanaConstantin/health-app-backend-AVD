
import React from 'react'
import { StyleSheet, View } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'

import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderColor: 'transparent',
    borderRadius: 10,
    borderWidth: 1,
    height: 34,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 18,
    width: 34,
  },
})

const Icon = ({ containerStyle, name, ionicons, materialI, entypo, materialsC }) => (
  <View style={[styles.container, containerStyle]}>
      {ionicons ? (
          <Ionicons
              size={24}
              color="white"
              type="material"
              name={name}
          />
      ) : ( materialI ? (
          <MaterialIcons
              size={24}
              color="white"
              type="material"
              name={name}
          />
      ) : (entypo ? (
          <Entypo
              size={24}
              color="white"
              type="material"
              name={name}
          />
      ) : (materialsC ? (
          <MaterialCommunityIcons
              size={24}
              color="white"
              type="material"
              name={name}
          />
      ) : (
      <View/>
      ))))}
  </View>
)

Icon.propTypes = {
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  icon: PropTypes.object,
  iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
}

Icon.defaultProps = {
  containerStyle: {},
  icon: {},
  iconStyle: {},
}

export default Icon