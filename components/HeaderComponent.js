// HeaderComponent.js
import React from 'react';
import Constants from 'expo-constants';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const toggleMenu = () => {
  const newValue = !showMenu;
  setShowMenu(newValue); 
  Animated.timing(overlayAnimation, {
    toValue: newValue ? 1 : 0,
    duration: 250,
    useNativeDriver: false,
  }).start(() => {
    if (newValue) {
      Animated.timing(menuAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(menuAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setShowMenu(false);
      });
    }
  });
};

const HeaderComponent = ({ toggleMenu, selectedTab }) => {
  return (
    <View style={(selectedTab === 'mapa' || selectedTab === 'comida') ? {display:'none'} : styles.header}>
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <Image source={require('../images/boton_menu.png')} style={styles.menuIcon} />
      </TouchableOpacity>
      {selectedTab === 'eventos' && (
        <Image source={require('../images/header_eventos.png')} style={styles.headerImage} />
      )}
      {selectedTab === 'directorio' && ( 
        <Image source={require('../images/header_directorio.png')} style={styles.headerImage} /> 
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: Constants.statusBarHeight,
    height: 135,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    //display: 'none',
  },
  menuButton: {
    position: 'absolute',
    top: Constants.statusBarHeight + 20,
    left: 0,
    zIndex: 1,
  },
  menuIcon: {
    width: 30,
    height: 40,    
  },
  headerImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
});

export default HeaderComponent;
