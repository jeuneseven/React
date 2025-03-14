import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import iced-coffee

const app = () => {
  return (
    <View style = {styles.container}>
      <ImageBackground
        src=''
      >
        <Text style = {styles.text}>Hello World</Text>
      </ImageBackground>
    </View>
  )
}

export default app

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})