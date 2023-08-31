import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  Modal,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Background from '../../components/Background';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import {API_URL} from '../../constants/Baseurl';
import Colors from '../../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function SignUpScreen({navigation}) {
  const [userFullName, setUserFullNamel] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const sendLoginScreen = () => {
    setIsRegistraionSuccess(false);
    navigation.navigate('LoginScreen');
  };

  const handleSubmitButton = async () => {
    setErrortext('');
    if (!userFullName) {
      setErrortext('Please enter the Full Name');
      return;
    }
    if (!userEmail) {
      setErrortext('Please enter the Email');
      return;
    }
    if (!userPassword) {
      setErrortext('Please enter the Password');
      return;
    }
    setLoading(true);
    var dataToSend = {
      fullname: userFullName,
      email: userEmail,
      password: userPassword,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }

    formBody = formBody.join('&');

    await fetch(`${API_URL}/api/auth/signup`, {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setLoading(false);
        if (responseJson.meta.status === 200) {
          setIsRegistraionSuccess(true);
          console.log('Registration Successful. Please Login to proceed');
        } else {
          setErrortext(responseJson.meta.message);
        }
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  };
  return (
    <Background>
      <Loader loading={loading} />
      <Modal visible={isRegistraionSuccess} transparent>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              padding: 15,
              borderRadius: 15,
              alignItems: 'center',
            }}>
            <MaterialIcons
              name="verified-user"
              color={Colors.successColor}
              size={110}
              style={{
                alignSelf: 'center',
              }}
            />
            <Text
              style={{
                fontSize: 18,
                marginBottom: 20,
                marginTop: 20,
                color: Colors.successColor,
              }}>
              Registration Succesfully Completed !
            </Text>
            <Button
              mode="contained"
              onPress={sendLoginScreen}
              style={{marginTop: 30}}>
              Login Now
            </Button>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={sendLoginScreen} style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../Images/arrow_back.png')}
        />
      </TouchableOpacity>
      <AntDesign
        name="adduser"
        color={Colors.logo}
        size={200}
        style={{
          alignSelf: 'center',
          marginBottom: 10,
        }}
      />
      <Header>New User Register</Header>
      <View style={{marginBottom: 40}}></View>
      <TextInput
        label="Full Name"
        returnKeyType="done"
        value={userFullName}
        onChangeText={text => setUserFullNamel(text)}
        autoCapitalize="words"
      />
      <TextInput
        label="Email"
        returnKeyType="done"
        value={userEmail}
        onChangeText={text => setUserEmail(text)}
        autoCompleteType="email"
        textContentType="emailAddress"
        autoCapitalize="none"
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
      <Button
        mode="contained"
        onPress={handleSubmitButton}
        style={{marginTop: 16}}>
        Sign Up
      </Button>
    </Background>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});
