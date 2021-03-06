import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types'


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
  },
  emailColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  emailIcon: {
    color: '#01C89E',
    fontSize: 30,
  },
  emailNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  emailNameText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '200',
  },
  emailRow: {
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  emailText: {
    fontSize: 16,
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center',
  },
})

const Email = ({ onPressEmail, email }) => (
  <TouchableOpacity onPress={() => onPressEmail(email)}>
    <View style={[styles.container]}>
      <View style={styles.iconRow}>
          <MaterialIcons
            name="email"
            size={30}
            underlayColor="transparent"
            iconStyle={styles.emailIcon}
            onPress={() => onPressEmail()}
          />
      </View>
      <View style={styles.emailRow}>
        <View style={styles.emailColumn}>
          <Text style={styles.emailText}>{email}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
)

Email.propTypes = {
  email: PropTypes.string.isRequired,
  onPressEmail: PropTypes.func.isRequired,
}

Email.defaultProps = {
  containerStyle: {},
  name: null,
}

export default Email