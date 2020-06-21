import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native'


let album = require('../../../json/album.json')

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

export default class AlbumList extends Component {

    constructor(props) {
        super(props)
        this.state = { interfaceDetermination: '流行', dataSource: [] }
    }

    componentDidMount() {
        fetch("http://39.101.173.146:8080/Voice_of_Beicheng/GetAlbumOfSpecifiedType?type=流行", { method: 'GET' })
            .then(resp => resp.json())
            .then(dataSource => {
                this.setState({ dataSource })
                console.log(dataSource)
            })
    }

    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate("ItemList", {
                    A_id:item.A_id,
                    uri: item.img,
                    name: item.name,
                    singer: item.singer[0],
                    time: item.time
                })
            }}>
                <View key={index} style={{ height: screenHeight * 0.2, width: screenWidth, flexDirection: 'row', borderBottomWidth: 1 }}>
                    <View key={index} style={{ width: screenWidth, flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{ uri: item.img }} style={{ height: screenHeight * 0.18, width: screenHeight * 0.18, marginLeft: screenWidth * 0.03 }} />
                        <View style={{ marginLeft: screenWidth * 0.03 }}>
                            <Text style={{ fontSize: 18 }}>专辑名：{item.name}</Text>
                            <Text style={{ fontSize: 18 }}>歌手：{item.singer[0]}</Text>
                            <Text style={{ fontSize: 18 }}>发行时间：{item.time}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _setInterface =()=>{
        if(this.state.interfaceDetermination === '流行'){
            null
        }else {
            this.setState({
                interfaceDetermination:'流行'
            })
            fetch("http://39.101.173.146:8080/Voice_of_Beicheng/GetAlbumOfSpecifiedType?type=流行", { method: 'GET' })
            .then(resp => resp.json())
            .then(dataSource => {
                this.setState({ dataSource })
                console.log(dataSource)
            })
        }
    }
    _setInterface2=()=>{
        if(this.state.interfaceDetermination === '舞曲'){
            null
        }else {
            this.setState({
                interfaceDetermination:'舞曲'
            })
            fetch("http://39.101.173.146:8080/Voice_of_Beicheng/GetAlbumOfSpecifiedType?type=舞曲", { method: 'GET' })
            .then(resp => resp.json())
            .then(dataSource => {
                this.setState({ dataSource })
                console.log(dataSource)
            })
        }
    }
    render() {
        return (
            <View>
                <View style={{width:screenWidth,backgroundColor:'white',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                    <TouchableOpacity onPress={this._setInterface}>
                    <Text style={{marginBottom:screenHeight*0.02,marginTop:screenHeight*0.02,fontSize:18}}>流行</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._setInterface2}>
                    <Text style={{marginBottom:screenHeight*0.02,marginTop:screenHeight*0.02,fontSize:18}}>舞曲</Text>
                    </TouchableOpacity> 
                </View>
                <FlatList
                    ItemSeparatorComponent={this._ItemSeparatorComponent}
                    data={this.state.dataSource}
                    renderItem={this._renderItem}
                    keyExtractor={({ item, index }) => index}
                    style={{ backgroundColor: 'white', borderTopWidth: 5, borderTopColor: '#DDDDDD' }}
                />
            </View>
        )
    }
}

