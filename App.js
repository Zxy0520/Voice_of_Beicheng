/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react'
import { Text, View, Button, Modal, ScrollView, Dimensions, Image } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Main from './component/main/Main'
import Settings from './component/settings/Settings'

const Drawer = createDrawerNavigator()
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = { visible: true, img0: '', img1: '' }
    }

    componentDidMount() {
        fetch("http://39.101.173.146:8080/Voice_of_Beicheng/GetAdvertising", { method: 'GET' })
            .then(resp => resp.json())
            .then(dataSource => {
                this.setState({ img0: dataSource[0].img, img1: dataSource[1].img })
            })
    }
    render() {
        return (

            <NavigationContainer>
                <Modal visible={this.state.visible}>
                    <ScrollView
                        horizontal={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View key={1} style={{ flex: 1, height: screenHeight, width: screenWidth }}>
                            <Image source={{ uri: this.state.img0 }} style={{ height: screenHeight, width: screenWidth }} />
                        </View>
                        <View key={2} style={{ flex: 1, height: screenHeight, width: screenWidth }}>
                            <Image source={{ uri: this.state.img1 }} style={{ height: screenHeight, width: screenWidth }} />
                            <AntDesign name="closecircleo" size={35} color="white" onPress={() => this.setState({ visible: false })} style={{ position: "absolute",marginLeft: screenWidth * 0.89, marginTop: screenHeight * 0.02 }}></AntDesign>
                        </View>

                    </ScrollView>
                </Modal>
                <Drawer.Navigator>
                    <Drawer.Screen name="Main" component={Main} />
                    <Drawer.Screen name="Settings" component={Settings} />
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}