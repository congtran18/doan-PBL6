// import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button} from 'react-native';
import LottieView from 'lottie-react-native';

export default function Splash({visible = false})  {
  if (!visible) return null;

  return (
    <LottieView source={require('../../assets/loading.json')} 
    autoPlay 
    loop={false}/>
  );
}

const styles = StyleSheet.create({

});
