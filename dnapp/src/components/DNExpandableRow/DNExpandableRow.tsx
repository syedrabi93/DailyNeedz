import React from 'react';
import { View, Animated, ViewStyle, LayoutAnimation, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Touchable } from '../DNRow/Touchable';
import { Reg } from '../StyledText/Reg';

export interface DNExpandableRowProps {
   title: string;
   hiddenComp?: React.ReactElement;
   down?: React.ReactElement;
   right?: React.ReactElement;
   onPress?: () => void;
   showLeftIcon?: boolean;
   elevated?: boolean;
}

interface State {
   open: boolean;
}

interface StateLessRowProps {
   title: string;
   leftIcons?: React.ReactElement;
   rightIcon: React.ReactElement;
   showLeftIcon?: boolean;
   style?: ViewStyle;
   bold?: boolean;
}

const StateLessRow: React.FunctionComponent<StateLessRowProps> = ({
   title,
   rightIcon,
   showLeftIcon,
   style,
   bold,
}) => (
   <View style={[{ flexDirection: 'row' }, style]}>
      {showLeftIcon ? <View style={{ flex: 1, justifyContent: 'center' }} /> : null}

      <View style={{ flex: 8, justifyContent: 'center', paddingVertical: 18, paddingLeft: 20 }}>
         <Reg style={{ color: '#444', fontSize: 14, fontFamily: bold ? 'opb' : 'opr' }}>
            {title}
         </Reg>
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>{rightIcon}</View>
   </View>
);

const TouchableRow = Touchable(StateLessRow);

class DNExpandableRow extends React.PureComponent<DNExpandableRowProps, State> {
   state: Readonly<State> = {
      open: false,
   };
   opacity: Animated.Value;
   constructor(props: DNExpandableRowProps) {
      super(props);
      this.opacity = new Animated.Value(0);
   }

   handleToggle = () => {
      LayoutAnimation.configureNext(LayoutAnimation.create(200, 'linear', 'opacity'));
      this.setState({ open: !this.state.open });
   };
   render() {
      const {
         hiddenComp,
         title,
         down = <MaterialCommunityIcons name="chevron-down" size={22} color="#8a8a8a" />,
         right = <MaterialCommunityIcons name="chevron-right" size={22} color="#8a8a8a" />,
         onPress,
         showLeftIcon,
         elevated = false,
      } = this.props;
      const rightIcon = this.state.open ? down : right;
      const elevatedStyles = elevated
         ? { elevation: 1, marginBottom: 5 }
         : { borderColor: '#eeeef0', borderBottomWidth: 1 };
      return (
         <View
            style={[
               {
                  backgroundColor: '#fff',
                  ...Platform.select({ ios: { borderColor: '#eeeef0', borderBottomWidth: 1 } }),
               },
               elevatedStyles,
            ]}>
            <TouchableRow
               title={title}
               showLeftIcon={showLeftIcon}
               style={{ backgroundColor: '#fff' }}
               bold={this.state.open}
               rightIcon={rightIcon}
               onPress={onPress ? onPress : this.handleToggle}
            />
            {this.state.open && hiddenComp}
         </View>
      );
   }
}

export { DNExpandableRow };
