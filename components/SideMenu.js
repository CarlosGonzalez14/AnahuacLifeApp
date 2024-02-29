import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import Constants from 'expo-constants';

const SideMenu = ({ menuAnimation, closeMenu }) => {
  return (
    <Animated.View style={[styles.sideMenu, { transform: [{ translateX: menuAnimation }] }]}>
      <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
        <Image source={require('../images/boton_menu_cierre.png')} style={styles.closeIcon} />
      </TouchableOpacity>
      <Text style={styles.sideMenuItem}>Perfil</Text>
      <Text style={styles.sideMenuItem}>Notificaciones</Text>
      <Text style={styles.sideMenuItem}>Configuración</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sideMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '60%',
    backgroundColor: '#ffffff',
    elevation: 4,
    shadowColor: '#000000',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 20,
    zIndex: 2,
  },
  closeButton: {
    position: 'absolute',
    top: Constants.statusBarHeight + 20,
    right: -30,
    zIndex: 3,
  },
  closeIcon: {
    width: 30,
    height: 40,
  },
  sideMenuItem: {
    top: Constants.statusBarHeight + 20,
    paddingTop: 10,
    fontSize: 14,
    //fontFamily: 'Araboto',
    color: '#333',
    textAlign: 'left',
  },
});

export default SideMenu;
