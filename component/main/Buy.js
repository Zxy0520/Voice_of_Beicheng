import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import ItemList from './buy/ItemList'
import AlbumList from './buy/AlbumList'
import ItemDetail from './buy/ItemDetail'


const Stack = createStackNavigator()

export default class Buy extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            // <View>
            //     <View><Text>123456</Text></View>
            //     <SafeAreaProvider>
            //         <Stack.Navigator>
            //             <Stack.Screen name="舞曲" component={DanceMusic} />
            //             <Stack.Screen name="流行" component={Popular} />
            //         </Stack.Navigator>
            //     </SafeAreaProvider>
            // </View>
            
                <Stack.Navigator
                    initialRouteName="AlbumList"
                >
                    <Stack.Screen name="ItemList" component={ItemList} options={{ title: '专辑' }} />
                    <Stack.Screen name="ItemDetail" component={ItemDetail} options={{ title: '歌曲详情' }} />
                    <Stack.Screen name="AlbumList" component={AlbumList} options={{ title: '专辑列表' }} />
                </Stack.Navigator>


        )
    }
}
