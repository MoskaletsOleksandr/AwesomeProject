import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { registerUserThunk } from '../redux/user/thunks';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../config';

const RegistrationScreen = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [isLoginFocused, setIsLoginFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const keyboardDidShow = () => {
    setIsKeyboardOpen(true);
  };

  const keyboardDidHide = () => {
    setIsKeyboardOpen(false);
  };

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const { assets } = result;
      if (assets && assets.length > 0) {
        const selectedPhotoUri = assets[0].uri;
        setPhoto(selectedPhotoUri);
      }
    }
  };

  Keyboard.addListener('keyboardDidShow', keyboardDidShow);
  Keyboard.addListener('keyboardDidHide', keyboardDidHide);

  const handleRegister = async () => {
    const response = await fetch(photo);
    const blob = await response.blob();

    const uniqueId = `user${Date.now()}`;
    const storageRef = ref(storage, `posts/${uniqueId}`);
    const snapshot = await uploadBytes(storageRef, blob);

    const downloadURL = await getDownloadURL(snapshot.ref);

    const data = { email, password, login, downloadURL };
    try {
      await dispatch(registerUserThunk(data));
      setEmail('');
      setPassword('');
      setLogin('');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Помилка реєстрації:', error.message);
    }
  };

  const handleFocus = (setter) => {
    setter(true);
  };

  const handleBlur = (setter) => {
    setter(false);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevVisible) => !prevVisible);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require('../assets/main-bg.png')}
        resizeMode="cover"
      />
      <KeyboardAvoidingView style={styles.contentContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.formContainer}>
            <View style={styles.userImgContainer}>
              <TouchableOpacity onPress={handleImagePicker}>
                {photo ? (
                  <Image source={{ uri: photo }} style={styles.userImg} />
                ) : (
                  <AntDesign
                    name="pluscircleo"
                    size={25}
                    color="#FF6C00"
                    style={styles.plusIcon}
                  />
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>Реєстрація</Text>
            <TextInput
              placeholder="Логін"
              placeholderTextColor="#BDBDBD"
              style={[styles.input, isLoginFocused && styles.inputFocused]}
              value={login}
              onChangeText={setLogin}
              onFocus={() => {
                handleFocus(setIsLoginFocused);
              }}
              onBlur={() => {
                handleBlur(setIsLoginFocused);
              }}
            />
            <TextInput
              style={[styles.input, isEmailFocused && styles.inputFocused]}
              value={email}
              onChangeText={setEmail}
              onFocus={() => {
                handleFocus(setIsEmailFocused);
              }}
              onBlur={() => {
                handleBlur(setIsEmailFocused);
              }}
              placeholder="Адреса електронної пошти"
              placeholderTextColor="#BDBDBD"
            />
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, isPasswordFocused && styles.inputFocused]}
                value={password}
                onChangeText={setPassword}
                onFocus={() => {
                  handleFocus(setIsPasswordFocused);
                }}
                onBlur={() => {
                  handleBlur(setIsPasswordFocused);
                }}
                placeholder="Пароль"
                placeholderTextColor="#BDBDBD"
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity
                style={styles.showPasswordButton}
                onPress={togglePasswordVisibility}
              >
                <Text style={styles.showPasswordButtonText}>
                  {isPasswordVisible ? 'Сховати' : 'Показати'}
                </Text>
              </TouchableOpacity>
            </View>
            {!isKeyboardOpen && (
              <>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleRegister}
                >
                  <Text style={styles.buttonText}>Зареєструватися</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.loginLink}
                  onPress={() => {
                    navigation.navigate('Login');
                  }}
                >
                  <Text style={styles.loginLinkText}>Вже є акаунт? Увійти</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    minHeight: 549,
  },
  formContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 92,
    paddingBottom: 32,
    backgroundColor: '#fff',
    borderRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  input: {
    width: '100%',
    height: 50,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 7,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 18.75,
  },
  inputFocused: {
    borderColor: '#FF6C00',
  },
  inputWrapper: {
    width: '100%',
  },
  loginLink: {
    marginTop: 16,
  },
  loginLinkText: {
    fontSize: 16,
    color: '#1B4371',
    textDecorationLine: 'none',
  },
  button: {
    width: '100%',
    backgroundColor: '#FF6C00',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    marginTop: 38,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    marginBottom: 32,
    fontFamily: 'Roboto',
  },
  userImgContainer: {
    position: 'absolute',
    top: -60,
    borderRadius: 16,
    backgroundColor: '#F6F6F6',
    width: 120,
    height: 120,
  },
  userImg: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  plusIcon: {
    position: 'absolute',
    right: -12,
    top: 81,
  },
  showPasswordButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  showPasswordButtonText: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 18.75,
  },
});

export default RegistrationScreen;
