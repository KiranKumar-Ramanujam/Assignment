import React from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../constants/Colors';

const CartItem = props => {
  if (props.cart == true) {
    return (
      <View style={styles.container} onPress={props.onPress}>
        <Text style={styles.title}>{props.title}</Text>
        <View style={styles.details}>
          <Text style={styles.quantity}>QTY : {props.quantity}</Text>
          <Text style={styles.sum}>Price : RM{props.sum.toFixed(2)}</Text>
        </View>
        {!props.deleteable && (
          <Pressable>
            <Icon
              name="delete"
              size={30}
              color={Colors.primaryColor}
              onPress={props.onDelete}
            />
          </Pressable>
        )}
      </View>
    );
  } else {
    return (
      <View style={styles.container} onPress={props.onPress}>
        <Text style={styles.title}>{props.title}</Text>
        <View style={styles.details}>
          <Text style={styles.quantity}>QTY : {props.quantity}</Text>
          <Text style={styles.sum}>Price : RM{props.sum.toFixed(2)}</Text>
          <Pressable
            style={[styles.viewBtn, {borderColor: props.orderstatuscolor}]}>
            <Text style={styles.date}>{props.orderstatus}</Text>
          </Pressable>
        </View>
        {!props.deleteable && (
          <Pressable>
            <Icon
              name="delete"
              size={30}
              color={Colors.primaryColor}
              onPress={props.onDelete}
            />
          </Pressable>
        )}
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {height: 4, width: 0},
    shadowRadius: 6,
    elevation: 7,
    borderRadius: 10,
    backgroundColor: '#fff',
    height: 90,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    marginHorizontal: 6,
    marginTop: 6,
  },
  title: {
    fontSize: 20,
    flex: 0.5,
    color: Colors.fontColor,
  },
  quantity: {
    color: '#888',
    fontSize: 16,
    marginBottom: 5,
  },
  sum: {
    color: '#888',
    fontSize: 16,
  },
  details: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 0.4,
  },
  viewBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 2,
  },
  date: {
    color: '#888',
    fontSize: 12,
    color: Colors.fontColor,
  },
});
export default CartItem;
