import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BaseModal from 'react-native-modal';
import {colors} from '../../../utils/colors';
import {
  heightComparedByReference as height,
  widthComparedByReference as width,
} from '../../../utils/responsive';
import Gap from '../Gap';
import {useDispatch} from 'react-redux';
import {
  createListItem,
  setModal,
} from '../../../features/listItem/listItemSlice';

const Modal = ({isVisible, onCloseModal}) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    ItemId: -3,
    OrderId: 0,
    ItemName: '',
    Quantity: 0,
    Price: 0,
  });

  const handleFormLicence = (key, value) => {
    try {
      setForm(prevState => ({
        ...prevState,
        [key]: value,
      }));
    } catch (e) {}
  };

  const handleCreateItem = () => {
    dispatch(createListItem(form)).then(res => {
      console.log('second', res);
      if (res.payload.Description === 'Success') {
        dispatch(setModal(false));
      }
    });
  };

  return (
    <BaseModal isVisible={isVisible}>
      <SafeAreaView style={styles.containerModal}>
        <View
          style={{
            backgroundColor: 'white',
            padding: width(10),
            margin: width(10),
            width: '100%',
          }}>
          <View>
            <Text style={{textAlign: 'center'}}>New Item</Text>
            <View>
              <View>
                <Text>Item Name</Text>
                <TextInput
                  placeholder="Item Name"
                  value={form.ItemName}
                  onChangeText={value => handleFormLicence('ItemName', value)}
                />
              </View>
              <Gap height={height(15)} />
              <View>
                <Text>Price</Text>
                <TextInput
                  placeholder="Price"
                  value={form.Price}
                  onChangeText={value =>
                    handleFormLicence('Price', Number(value))
                  }
                />
              </View>
              <Gap height={height(15)} />
              <View>
                <Text>QTY</Text>
                <TextInput
                  placeholder="Quantity"
                  keyboardType="number-pad"
                  value={form.Quantity}
                  onChangeText={value =>
                    handleFormLicence('Quantity', Number(value))
                  }
                />
              </View>
              <Gap height={height(15)} />
            </View>
            <Gap height={height(25)} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text>Total:</Text>
              <Text>2.000.000</Text>
            </View>
            <Gap height={height(50)} />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleCreateItem}>
                <Text style={{color: colors.text.primary}}>Proccess Order</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: colors.button.secondary,
                    borderWidth: 1,
                    borderColor: colors.button.primary,
                  },
                ]}
                onPress={onCloseModal}>
                <Text style={{color: colors.text.secondary}}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </BaseModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: width(130),
    height: height(30),
    borderRadius: width(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.button.primary,
  },
});
