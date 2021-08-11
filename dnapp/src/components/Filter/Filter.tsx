import React from 'react';
import { View, Text, TouchableWithoutFeedback as TB } from 'react-native';
import { Checkbox } from 'react-native-paper';

class Filter extends React.PureComponent<any,any> {
  constructor(props:any) {
    super(props);

    this.state = {
      checked: false,
    };
  }

  render() {
    let { name } = this.props;
    return (
      <TB
        onPress={() => {
          this.setState({ checked: !this.state.checked });
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 2,
            paddingHorizontal: 20,
            backgroundColor: '#fff',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{ fontWeight: 'bold' }}>{name}</Text>
          <Checkbox
            underlayColor="#d9d9d9"
            status={this.state.checked ? 'checked' : 'unchecked'}
            color="#29353a"
          />
        </View>
      </TB>
    );
  }
}
export { Filter };
