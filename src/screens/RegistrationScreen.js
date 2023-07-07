import React, { useState } from 'react';
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const RegistrationScreen = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const keyboardDidShow = () => {
    setIsKeyboardOpen(true);
  };

  const keyboardDidHide = () => {
    setIsKeyboardOpen(false);
  };

  Keyboard.addListener('keyboardDidShow', keyboardDidShow);
  Keyboard.addListener('keyboardDidHide', keyboardDidHide);

  const handleRegister = () => {
    // Логіка обробки реєстрації
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require('../assets/main-bg.png')}
        resizeMode="cover"
      />
      <KeyboardAvoidingView style={styles.contentContainer}>
        <TouchableWithoutFeedback>
          <View style={styles.formContainer}>
            <View style={styles.userImg}>
              <TouchableOpacity>
                <AntDesign
                  name="pluscircleo"
                  size={25}
                  color="#FF6C00"
                  style={styles.plusIcon}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>Реєстрація</Text>
            <TextInput
              style={styles.input}
              placeholder="Логін"
              placeholderTextColor="#BDBDBD"
            />
            <TextInput
              style={styles.input}
              placeholder="Адреса електронної пошти"
              placeholderTextColor="#BDBDBD"
            />
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Пароль"
                placeholderTextColor="#BDBDBD"
                secureTextEntry
              />
              <TouchableOpacity style={styles.showPasswordButton}>
                <Text style={styles.showPasswordButtonText}>Сховати</Text>
              </TouchableOpacity>
            </View>
            {!isKeyboardOpen && (
              <>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleRegister}
                >
                  <Text style={styles.buttonText}>Зареєстуватися</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginLink}>
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
  userImg: {
    position: 'absolute',
    top: -60,
    borderRadius: 16,
    backgroundColor: '#F6F6F6',
    width: 120,
    height: 120,
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
