import React, { PureComponent } from 'react';
import { Entypo } from '@expo/vector-icons';

import {  StyleSheet, TouchableOpacity } from 'react-native';
class DrawerIcon extends PureComponent<any, any>  {
  static defaultProps = {
    size: 20,
    color: '#fff',
  };

  render() {
    return (
      <TouchableOpacity
        style={[styles.drawerIcon, this.props.containerStyle]}
        onPress={this.props.onPress}>
        <Entypo name={'menu'} size={this.props.size} color={this.props.color} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  drawerIcon: {
    paddingLeft: 20,
  },
});

export { DrawerIcon };
