import React from 'react';
import { View, Text, TouchableWithoutFeedback as TB } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { Filter } from './Filter';

class FilterName extends React.PureComponent<any,any> {
  constructor(props:any) {
    super(props);

    this.state = {
      open: false,
      list: props.list,
    };
  }

  render() {
    let { name } = this.props;
    return (
      <View>
        <TB
          style={{
            flexDirection: 'row',
          }}
          onPress={() => {
            this.setState({ open: !this.state.open });
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingRight: 30,
              backgroundColor: '#fff',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderColor: '#d9d9d9',
            }}>
            <Text style={{ fontWeight: 'bold' }}>{name}</Text>
            {this.state.open ? (
              <Entypo name="chevron-up" size={20} color="#333" />
            ) : (
              <Entypo name="chevron-down" size={20} color="#333" />
            )}
          </View>
        </TB>
        {this.state.open &&
          this.state.list.map((item:any) => {
            return <Filter name={item.name} />;
          })}
      </View>
    );
  }
}

export { FilterName };
