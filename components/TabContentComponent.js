// TabContentComponent.js
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import SliderBox from 'react-native-image-slider-box';
import ExpandableContainer from './ExpandableContainer';
import SeccionRecuadros from './SeccionRecuadros';

const TabContentComponent = ({ selectedTab, images }) => {
  return (
    <View style={styles.content}>
      {selectedTab === 'horario' && <Text>Contenido del Horario</Text>}
      {selectedTab === 'directorio' && <Text>Contenido del Directorio</Text>}
      {selectedTab === 'mapa' && <Text>Mapa</Text>}
      {selectedTab === 'comida' && <Text>Contenido de Comida</Text>}
      {selectedTab === 'eventos' && (
        <View>
          <SliderBox
            images={images}
            // SliderBox props
          />
          <ExpandableContainer title="Actividades comunidad universitaria" imageSource={require('./images/contenedorcomunidad_eventos.png')} />
          <ExpandableContainer title="Actividades grupos de liderazgo" imageSource={require('./images/contenedorcomunidad_eventos.png')} />
          {/* Additional content for eventos tab */}
        </View>
      )}
    </View>
  );
};

export default TabContentComponent;
