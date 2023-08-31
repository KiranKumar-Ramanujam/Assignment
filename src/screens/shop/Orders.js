import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import OrderItem from '../../components/OrderItem';

const Orders = () => {
  const {orders} = useSelector(state => state.orders);

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Orders</Text>
      </View>
      <FlatList
        data={orders}
        contentContainerStyle={styles.list}
        renderItem={dt => {
          return (
            <OrderItem
              items={dt.item.items}
              total={dt.item.totalAmount}
              date={dt.item.readableDate}
              actualdate={dt.item.date}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    alignItems: 'center',
    minHeight: '100%',
  },
  header: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 3,
    color: 'black',
  },
  list: {
    width: Dimensions.get('window').width - 20,
    flex: 1,
    alignItems: 'center',
    minHeight: '100%',
    paddingBottom: 300,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
export default Orders;
