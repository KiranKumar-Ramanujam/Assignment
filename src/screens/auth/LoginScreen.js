import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import {theme} from '../../components/theme';
import Loader from '../../components/Loader';
import {API_URL} from '../../constants/Baseurl';
import Colors from '../../constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function LoginScreen({navigation}) {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const clearState = () => {
    setUserEmail('');
    setUserPassword('');
  };

  const onLoginPressed = async () => {
    if (!userEmail) {
      setErrortext('Please enter the Email');
      return;
    }
    if (!userPassword) {
      setErrortext('Please enter the Password');
      return;
    }
    setLoading(true);
    const payload = {
      userEmail,
      userPassword,
    };
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const jsonRes = await res.json();
    if (jsonRes.meta.status == 200) {
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{name: 'AppStackNav'}],
      });
    } else {
      clearState();
      setErrortext(jsonRes.meta.message);
      setLoading(false);
    }
  };

  const onSignUpPressed = () => {
    navigation.reset({
      index: 1,
      routes: [{name: 'SignUpScreen'}],
    });
  };

  return (
    <Background>
      <Loader loading={loading} />
      <FontAwesome
        name="user-circle-o"
        color={Colors.logo}
        size={200}
        style={{
          alignSelf: 'center',
          marginBottom: 10,
        }}
      />
      <Header>User Login</Header>
      <View style={{marginBottom: 40}}></View>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={userEmail}
        onChangeText={text => setUserEmail(text)}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={userPassword}
        onChangeText={text => setUserPassword(text)}
        secureTextEntry
      />
      {errortext != '' ? (
        <Text style={styles.errorTextStyle}>{errortext}</Text>
      ) : null}
      <View
        style={{
          marginBottom: 20,
        }}></View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <Text
        style={{
          fontSize: 15,
          fontWeight: '500',
          color: Colors.info,
        }}>
        or
      </Text>
      <Button mode="contained" onPress={onSignUpPressed}>
        Sign Up
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  errorTextStyle: {
    color: 'red',
    fontSize: 15,
    alignSelf: 'center',
  },
});
