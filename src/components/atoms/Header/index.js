import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthComparedByReference as width,
  heightComparedByReference as height,
} from '../../../utils/responsive';
import {AkmalPic, ICHamburger} from '../../../images';

const Header = () => {
  return (
    <View style={styles.content}>
      <Image source={AkmalPic} style={styles.profilePic} />
      <Image source={ICHamburger} style={styles.icon} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    padding: width(10),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profilePic: {
    width: width(50),
    height: height(50),
    borderRadius: 100,
  },
  icon: {
    width: width(25),
    height: height(25),
  },
});
