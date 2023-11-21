/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Gap, Header, Modal} from '../../components';
import {colors} from '../../utils/colors';
import {
  heightComparedByReference as height,
  widthComparedByReference as width,
} from '../../utils/responsive';
import {useDispatch, useSelector} from 'react-redux';
import {getListOrder} from '../../features/listOrder/listOrderSlice';
import {ICCalendar, ICDelete, ICEdit} from '../../images';
import {getListItem, setModal} from '../../features/listItem/listItemSlice';

const Home = () => {
  const {listOrder} = useSelector(state => state.listOrder);
  const {listItem, isModal} = useSelector(state => state.listItem);
  const dispatch = useDispatch();

  const [type, setType] = useState('');

  useEffect(() => {
    dispatch(getListOrder()).then(res => {
      console.log('getListOrder', res);
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getListItem()).then(res => {
      console.log('getListItem', res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  // eslint-disable-next-line react/no-unstable-nested-components
  const CardOrder = ({CustomerName, OrderNo}) => (
    <View style={styles.cardOrder}>
      <Text style={styles.cardDetails}>{CustomerName}</Text>
      <Text style={styles.cardDetails}>{OrderNo}</Text>
      <Text style={styles.cardDetails}>{CustomerName}</Text>
    </View>
  );

  // eslint-disable-next-line react/no-unstable-nested-components
  const CardItem = ({ItemName, Quantity, Price}) => (
    <View style={styles.cardItem}>
      <View>
        <Text>{ItemName}</Text>
        <Text>{Price}</Text>
      </View>
      <View>
        <Text>QTY</Text>
        <Text>{Quantity}</Text>
      </View>
      <View>
        <Text>Total</Text>
        <Text>{Quantity * Price}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity>
          <Image
            source={ICEdit}
            style={{width: width(20), height: height(20)}}
          />
        </TouchableOpacity>
        <Gap width={width(5)} />
        <TouchableOpacity>
          <Image
            source={ICDelete}
            style={{width: width(20), height: height(20)}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.container}>
            <Header />
            <View style={styles.content}>
              <Text style={styles.title}>Sales Order Input</Text>
            </View>
            <View style={styles.card}>
              <View style={styles.filterSection}>
                <Text style={styles.titleSection}>
                  {type === 'add' ? 'Sales Information' : 'Search'}
                </Text>
                <Gap height={height(15)} />
                {type === 'add' ? (
                  <View style={{}}>
                    <View style={styles.textInput}>
                      <TextInput
                        placeholder="Keyword"
                        placeholderTextColor="gray"
                      />
                    </View>
                    <Gap height={height(15)} />
                    <TouchableOpacity style={styles.buttonDate}>
                      <Text style={{color: 'gray'}}>Order Date</Text>
                      <Image
                        source={ICCalendar}
                        style={{width: width(20), height: width(20)}}
                      />
                    </TouchableOpacity>
                    <Gap height={height(15)} />
                    <View style={styles.textInput}>
                      <TextInput
                        placeholder="Customer Address"
                        placeholderTextColor="gray"
                      />
                    </View>
                    <Gap height={height(15)} />
                    <View style={styles.textInput}>
                      <TextInput
                        placeholder="Address"
                        placeholderTextColor="gray"
                        style={{paddingVertical: height(40)}}
                      />
                    </View>
                  </View>
                ) : (
                  <View style={{}}>
                    <View style={styles.textInput}>
                      <TextInput
                        placeholder="Keyword"
                        placeholderTextColor="gray"
                      />
                    </View>
                    <Gap height={height(15)} />
                    <TouchableOpacity style={styles.buttonDate}>
                      <Text style={{color: 'gray'}}>Order Date</Text>
                      <Image
                        source={ICCalendar}
                        style={{width: width(20), height: width(20)}}
                      />
                    </TouchableOpacity>
                    <Gap height={height(15)} />
                  </View>
                )}
              </View>
              <Gap height={height(50)} />
              {type === 'add' ? (
                <View style={{flex: 1}}>
                  <View style={styles.detailSalesContainer}>
                    <Text style={styles.titleSection}>Detail Sales</Text>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => dispatch(setModal(true))}>
                      <Text style={{color: colors.text.primary}}>Add Item</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex: 1}}>
                    {/* listItem */}
                    <FlatList
                      nestedScrollEnabled
                      key={index => index}
                      data={listItem}
                      scrollEnabled={false}
                      // eslint-disable-next-line react/no-unstable-nested-components
                      ItemSeparatorComponent={() => <Gap height={height(20)} />}
                      ListFooterComponent={() => <Gap height={height(200)} />}
                      renderItem={({item, index}) =>
                        item ? (
                          <CardItem
                            key={index}
                            ItemName={item.ItemName}
                            Quantity={item.Quantity}
                            Price={item.Price}
                          />
                        ) : null
                      }
                    />
                  </View>
                </View>
              ) : (
                <View style={{flex: 1}}>
                  <View style={styles.orderListSection}>
                    <Text style={styles.titleSection}>Order List</Text>
                    <Text>Total Items: 50</Text>
                  </View>
                  <Gap height={height(15)} />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => setType('add')}>
                    <Text style={{color: colors.text.primary}}>Add</Text>
                  </TouchableOpacity>
                  <Gap height={height(30)} />
                  <View style={{flex: 1}}>
                    <Text>List Order</Text>
                    <Gap height={height(10)} />
                    <View style={{flex: 1}}>
                      <FlatList
                        nestedScrollEnabled
                        key={index => index}
                        data={listOrder}
                        scrollEnabled={false}
                        // eslint-disable-next-line react/no-unstable-nested-components
                        ItemSeparatorComponent={() => (
                          <Gap height={height(20)} />
                        )}
                        renderItem={({item, index}) => (
                          <CardOrder
                            key={index}
                            CustomerName={item.CustomerName}
                            OrderNo={item.OrderNo}
                          />
                        )}
                      />
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
        {type === 'add' && (
          <View
            style={{
              position: 'absolute',
              zIndex: 9999999,
              bottom: 0,
              left: 0,
              right: 0,
              padding: width(10),
              backgroundColor: colors.white,
            }}>
            <View>
              <Text style={styles.cardDetailTitle}>Order Summary</Text>
              <View style={{paddingHorizontal: width(10)}}>
                <Gap height={height(20)} />
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.cardDetailText}>Sub Total</Text>
                  <Text style={styles.cardDetailText}>12.000.000</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.cardDetailText}>Total Product</Text>
                  <Text style={styles.cardDetailText}>6 Product</Text>
                </View>
                <Gap height={height(40)} />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setType('add')}>
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
                onPress={() => setType('')}>
                <Text style={{color: colors.text.secondary}}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <Gap height={height(50)} />
          </View>
        )}
      </SafeAreaView>
      <Modal
        isVisible={isModal}
        onCloseModal={() => dispatch(setModal(false))}
      />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    padding: width(10),
  },
  title: {
    color: colors.text.primary,
    fontWeight: 'bold',
    fontSize: width(30),
  },
  titleSection: {
    color: colors.text.secondary,
    fontWeight: '600',
    fontSize: width(18),
  },
  card: {
    flex: 1,
    backgroundColor: colors.card.primary,
    borderTopEndRadius: width(30),
    borderTopStartRadius: width(30),
    padding: width(20),
  },
  filterSection: {
    borderWidth: 1,
    borderRadius: width(20),
    padding: width(10),
  },
  orderListSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: width(5),
    padding: width(5),
  },
  buttonDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: width(5),
    padding: width(5),
  },
  button: {
    width: width(130),
    height: height(30),
    borderRadius: width(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.button.primary,
  },
  cardOrder: {
    backgroundColor: colors.white,
    padding: width(20),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: width(10),
  },
  cardItem: {
    backgroundColor: colors.white,
    padding: width(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: width(10),
  },
  cardDetails: {
    fontSize: width(15),
    fontWeight: '600',
  },
  detailSalesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardDetailTitle: {
    fontWeight: '700',
    fontSize: width(18),
  },
  cardDetailText: {
    fontWeight: '600',
    fontSize: width(15),
  },
});
