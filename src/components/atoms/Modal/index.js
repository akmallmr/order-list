import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BaseModal from 'react-native-modal';
import {colors} from '../../../utils/colors';
import {widthComparedByReference as width} from '../../../utils/responsive';

const Modal = ({isVisible, onCloseModal}) => {
  return (
    <BaseModal
      coverScreen
      isVisible={isVisible}
      style={{backgroundColor: 'white'}}>
      <SafeAreaView style={styles.containerModal}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            padding: width(10),
            margin: width(10),
          }}>
          <View style={{backgroundColor: 'white'}}>
            <Text>Hello!</Text>
          </View>
        </View>

        <Button title="Hide modal" onPress={onCloseModal} />
      </SafeAreaView>
    </BaseModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
  },
});
