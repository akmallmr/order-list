import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import RootContext from '../../router/RootContext';
import {useDispatch, useSelector} from 'react-redux';
import {signIn} from '../../features/auth/authSlice';

const Splash = () => {
  const {switchNavigate} = useContext(RootContext);
  const dispatch = useDispatch();
  const {account} = useSelector(state => state.auth);

  const [errorTxt, setErrorTxt] = useState('');

  useEffect(() => {
    dispatch(signIn()).then(res => {
      if (res.payload.access_token) {
        switchNavigate('Main');
      } else {
        setErrorTxt('Cannot grant token');
      }
    });
  }, [account.access_token, dispatch, switchNavigate]);

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Loading...</Text>
      <Text>{errorTxt}</Text>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
});
