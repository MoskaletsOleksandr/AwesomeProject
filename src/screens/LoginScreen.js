import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
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
import { useDispatch } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config';
import { setUser } from '../redux/user/userSlice';
import { useAuth } from '../hooks/use-auth';

const LoginScreen = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (isAuth) {
      navigation.navigate('Home');
    }
  }, [isAuth, navigation]);

  const keyboardDidShow = () => {
    setIsKeyboardOpen(true);
  };

  const keyboardDidHide = () => {
    setIsKeyboardOpen(false);
  };

  Keyboard.addListener('keyboardDidShow', keyboardDidShow);
  Keyboard.addListener('keyboardDidHide', keyboardDidHide);

  const handleFocus = (setter) => {
    setter(true);
  };

  const handleBlur = (setter) => {
    setter(false);
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            login: user.displayName,
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );
        setEmail('');
        setPassword('');
        navigation.navigate('Home');
      })
      .catch(() => alert('Invalid user!'));
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
            <Text style={styles.title}>Увійти</Text>
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
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                  <Text style={styles.buttonText}>Увійти</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.loginLink}
                  onPress={() => {
                    navigation.navigate('Registration');
                  }}
                >
                  <Text style={styles.loginLinkText}>
                    Немає акаунту?{' '}
                    <Text style={styles.loginLinkTextUnderline}>
                      Зареєструватися
                    </Text>
                  </Text>
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
    minHeight: 489,
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
    paddingTop: 32,
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
  loginLinkTextUnderline: {
    textDecorationLine: 'underline',
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
export default LoginScreen;
