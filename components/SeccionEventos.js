import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box'; //yarn add megamaxs1234/react-native-image-slider-box (te amo megamax1234)
import SeccionRecuadros from './eventos_components/SeccionRecuadros';
import ExpandableContainer from './eventos_components/ExpandableContainer';

const SeccionEventos = ({  }) => {
    const images = [
        require('../images/eventos/evento1.png'),
        require('../images/eventos/evento2.png'),
        require('../images/eventos/evento3.png'),
      ]

    return (
        <View>
            <SliderBox 
                images = {images} 
                dotStyle = {{height: 8, width: 8, borderRadius: 50}} 
                circleLoop autoplay={true} 
                autoplayInterval={4000} 
                disableOnPress
                firstItem={0}
                resizeMode={'cover'}
                paginationBoxVerticalPadding={15}
                paginationBoxStyle={{
                position: 'absolute', 
                }}
                sliderBoxHeight={300}
            />
            <ExpandableContainer title="COMUNIDAD UNIVERSITARIA" imageSource={require('../images/contenedorcomunidad_eventos.png')} />
            <ExpandableContainer title="GRUPOS DE LIDERAZGO" imageSource={require('../images/contenedorcomunidad_eventos.png')} />
            <View style={styles.divider} />
            <View style={styles.contenedor_titulo}>
                <Text style={styles.titulo}>Grupos Universitarios</Text>
            </View>
            <SeccionRecuadros/>{}
            <View style={styles.divider}/>
        </View>
    );
};

const styles = StyleSheet.create({
    divider: {
        borderBottomWidth: 3,
        borderBottomColor: '#FD5900',
        marginTop: 20,
        marginBottom: 10,
        elevation: 1,
        shadowColor: '#000000',
    },
    contenedor_titulo: {
        alignItems: 'center',
        margin: 15,
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FD5900',
        textShadowColor: 'rgba(0, 0, 0, 0.4)', 
        textShadowOffset: { width: 0.05, height: 0.05 }, 
        textShadowRadius: 1, 
    },    
});

export default SeccionEventos;


