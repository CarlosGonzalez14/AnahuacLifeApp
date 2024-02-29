import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ScrollView, Text, StatusBar, Animated, Platform } from 'react-native';
import Constants from 'expo-constants';
import HeaderComponent from './components/HeaderComponent';
import MenuComponent from './components/MenuComponent';
import SeccionEventos from './components/SeccionEventos';
import CuckooSeccion from './components/CuckooSeccion';
import Directorio from './components/directorioMike';
import Mapa from './Mapa';

const App = () => {
  const [selectedTab, setSelectedTab] = useState('eventos'); // Estado para rastrear la pestaña actual
  const [showMenu, setShowMenu] = useState(false); //Estado del menú lateral
  const menuAnimation = useRef(new Animated.Value(0)).current; //Animación para el menú lateral
  const overlayAnimation = useRef(new Animated.Value(0)).current; //Overlay: capa  intermedia entre menú lateral y ScrollView

  const handleTabPress = (tab) => { // Función para cambiar la pestaña actual
    setSelectedTab(tab);
  };

  const toggleMenu = () => { //Animación de apertura para el menú lateral
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
  
  const closeMenu = () => { //Animación de cierre del menú lateral
    Animated.timing(overlayAnimation, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      setShowMenu(false);
    });
    Animated.timing(menuAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const menuTranslateX = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 0],
  });

  const overlayOpacity = overlayAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  // if (Platform.OS === 'android') {
  //   StatusBar.setTranslucent(true);     
  // }
  
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" /> 
      {selectedTab !== 'mapa' && ( // Evitar el ScrollView en la pestaña "mapa"
        <ScrollView style={styles.scrollView}>
          <View style={(selectedTab === 'mapa' || selectedTab === 'comida') ? {display:'none'} : styles.header}> 
                  {/* <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
                    <Image source={require('./images/boton_menu.png')} style={styles.menuIcon} /> 
                  </TouchableOpacity>  */}
                  {/* {selectedTab === 'eventos' && ( // Mostrar la imagen del header solo en la pestaña de eventos
                    <Image source={require('./images/header_eventos.png')} style={styles.headerImage} /> // Encabezado
                  )} */}
                  {selectedTab === 'directorio' && ( // Mostrar la imagen del header solo en la pestaña de eventos
                    <Image source={require('./images/header_directorio.png')} style={styles.headerImage} /> // Encabezado

                  )}
          </View>
          <View style={styles.content}>
            {selectedTab === 'horario' && ( // Contenido específico para la pestaña de horario
              <Text>Contenido del Horario</Text> 
            )} 
            {selectedTab === 'directorio' && ( // Contenido específico para la pestaña de directorio
              <Directorio/>
            )}
            {selectedTab === 'comida' && ( // Contenido específico para la pestaña de comida
              <CuckooSeccion/> 
            )}
            {selectedTab === 'eventos' && ( // Contenido específico para la pestaña de eventos
              <SeccionEventos/>         
            )}
          </View>
        </ScrollView>
      )}
      {selectedTab === 'mapa' && ( // Contenido específico para la pestaña "mapa"                  
            <View style={{ flex: 1 }}>           
              <Mapa />            
            </View>          
      )}
      <MenuComponent handleTabPress={handleTabPress} selectedTab={selectedTab}/>
      {showMenu && (
        <Animated.View style={[styles.sideMenu, { transform: [{ translateX: menuTranslateX }] }]}>
          <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
            <Image source={require('./images/boton_menu_cierre.png')} style={styles.closeIcon} />
          </TouchableOpacity>
          <Text style={styles.sideMenuItem}>Perfil</Text>
          <Text style={styles.sideMenuItem}>Notificaciones</Text>
          <Text style={styles.sideMenuItem}>Configuración</Text>
        </Animated.View>
      )}
      {showMenu && (
        <TouchableOpacity onPress={closeMenu} style={[styles.overlay, { zIndex: 1, opacity: overlayOpacity }]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    marginBottom: 50,
  },
  header: {
    paddingTop: Constants.statusBarHeight,
    height: 135,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
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
  content: {
    flex: 1,
    padding: 0,
    backgroundColor: '#ffffff',
  },
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
    color: '#333',
    textAlign: 'left',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0, 
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1,
    //Hacerlo a doble de resolución para iPhone, no entendí jeje
    //
  },
});

export default App;