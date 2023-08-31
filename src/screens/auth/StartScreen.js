import React from 'react';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import {View} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Colors from '../../constants/Colors';

export default function StartScreen({navigation}) {
  return (
    <Background>
      <Fontisto
        name="shopping-bag-1"
        color={Colors.logo}
        size={300}
        style={{
          alignSelf: 'center',
          marginBottom: 40,
        }}
      />
      <View
        style={{
          marginBottom: 170,
        }}>
        <Header>SHOPPING CART</Header>
      </View>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}>
        Start
      </Button>
      <View style={{marginBottom: 100}}></View>
    </Background>
  );
}
