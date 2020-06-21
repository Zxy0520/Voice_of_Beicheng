import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native'

let music = require('../../../json/music.json')

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

export default class ItemList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            uri: '',
            name: '',
            singer: '',
            time: '',
        }
    }

    componentDidMount() {
        fetch("http://39.101.173.146:8080/Voice_of_Beicheng/GetTheSong?A_id="+this.props.route.params.A_id,{method:'GET'})
        .then(resp=>resp.json())
        .then(dataSource=>{
            this.setState({dataSource})
        })

        this.setState({
            uri: this.props.route.params.uri,
            name: this.props.route.params.name,
            singer: this.props.route.params.singer,
            time: this.props.route.params.time,
        })
    }

    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate("ItemDetail", {
                    dataSource: this.state.dataSource,
                    i: index,
                    img:this.state.uri
                })
            }}>
                <View key={index} style={{ height: screenHeight * 0.1, width: screenWidth, flexDirection: 'row' }}>
                    <View style={{ width: screenWidth * (1 / 7), alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15 }}>{index+1}</Text>
                    </View>

                    <View style={{ width: screenWidth, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18, color: 'black' }}>{item.name}</Text>
                        <Text style={{ color: 'gray' }}>{item.singer[0]}</Text>
                    </View>

                </View>
            </TouchableOpacity>

        )
    }

    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <View style={{ flexDirection: 'row', height: screenHeight * 0.3, width: screenWidth,alignItems:'center' }}>
                    <Image source={{ uri: this.state.uri }} style={{ height: screenHeight * 0.2, width: screenHeight * 0.2, marginLeft: screenWidth * 0.03 }} />
                    <View style={{marginLeft: screenWidth * 0.05}}>
                        <Text style={{ fontSize: 18 }}>专辑名：{this.state.name}</Text>
                        <Text style={{ fontSize: 18 }}>歌手：{this.state.singer}</Text>
                        <Text style={{ fontSize: 18 }}>发行时间：{this.state.time}</Text>
                    </View>
                </View>
                <FlatList
                    ItemSeparatorComponent={this._ItemSeparatorComponent}
                    data={this.state.dataSource}
                    renderItem={this._renderItem}
                    keyExtractor={({ item, index }) => index}
                    // refreshing={true}
                    // onRefresh={console.log('aaa')}
                    // onEndReached={this._reachEnd}
                    // onEndReachedThreshold={3}
                    style={{ backgroundColor: 'white', borderTopWidth: 5, borderTopColor: '#DDDDDD' }}
                />
            </View>

        )
    }
}
