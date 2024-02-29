import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

// Importar imágenes directamente al inicio del archivo
const horarioImage = require('../images/horario.png');
const horarioSelectedImage = require('../images/horario_selected.png');
const directorioImage = require('../images/directorio.png');
const directorioSelectedImage = require('../images/directorio_selected.png');
const mapaImage = require('../images/mapa.png');
const mapaSelectedImage = require('../images/mapa_selected.png');
const comidaImage = require('../images/comida.png');
const comidaSelectedImage = require('../images/comida_selected.png');
const eventosImage = require('../images/eventos.png');
const eventosSelectedImage = require('../images/eventos_selected.png');

const MenuComponent = ({ handleTabPress, selectedTab }) => {
  const tabs = ['horario', 'directorio', 'mapa', 'comida', 'eventos'];

  return (
    <View style={styles.menu}>
      {tabs.map(tab => (
        <TouchableOpacity key={tab} onPress={() => handleTabPress(tab)}>
          <Image
            // Usar las variables importadas para las imágenes
            source={selectedTab === tab ? getImage(tab, true) : getImage(tab, false)}
            style={styles.image}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Función para obtener la imagen correspondiente según la pestaña seleccionada
const getImage = (tab, isSelected) => {
  switch (tab) {
    case 'horario':
      return isSelected ? horarioSelectedImage : horarioImage;
    case 'directorio':
      return isSelected ? directorioSelectedImage : directorioImage;
    case 'mapa':
      return isSelected ? mapaSelectedImage : mapaImage;
    case 'comida':
      return isSelected ? comidaSelectedImage : comidaImage;
    case 'eventos':
      return isSelected ? eventosSelectedImage : eventosImage;
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#FD5900',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  image: {
    width: 65,
    height: 65,
  },
});

export default MenuComponent;
