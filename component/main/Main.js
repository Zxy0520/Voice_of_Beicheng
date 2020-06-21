import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Entypo from 'react-native-vector-icons/Entypo'

import Buy from './Buy'
import Home from './Home'
import Faq from './Faq'

const Tab = createBottomTabNavigator()

export default class Main extends Component {
    render() {
        return (
            <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home'
                            : 'home';
                    } else if (route.name === 'Buy') {
                        iconName = focused ? 'text-document-inverted' : 'text-document';
                    } else if (route.name === 'Faq') {
                        iconName = focused ? 'user' : 'user';
                    }

                    // You can return any component that you like here!
                    return <Entypo name={iconName} color={color} size={size} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Buy" component={Buy} />
                <Tab.Screen name="Faq" component={Faq} />
            </Tab.Navigator>
        )
    }
}
