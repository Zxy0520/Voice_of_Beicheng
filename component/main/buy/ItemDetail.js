import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import Video from 'react-native-video'
import Slider from '@react-native-community/slider'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

export default class ItemDetail extends Component {
    constructor(props) {
        super(props)
        this.player = null
        this.state = {
            index: 0,
            paused: true,
            muteJudgment: false,
            muteLoge: 'sound',
            logo: 'play',
            duration: 1,
            currentTime: 0,
            uri: '',
            name: '',
            singer: '',
            dataSource: [],
            length: 0
        }
    }

    componentDidMount() {
        // fetch("http://39.101.173.146:8080/ElephantClass/ViewCourseVideoController?course_ID=1",{method:'GET'})
        // .then(resp=>resp.json())
        // .then(albums=>{
        //     this.setState({albums:albums})
        // })
        this.setState({
            dataSource: this.props.route.params.dataSource,
            length: this.props.route.params.dataSource.length,
            uri: this.props.route.params.dataSource[this.props.route.params.i].uri,
            name: this.props.route.params.dataSource[this.props.route.params.i].name,
            singer: this.props.route.params.dataSource[this.props.route.params.i].singer,
            index: this.props.route.params.i
        })
    }

    _play = () => {
        let paused = this.state.paused
        this.setState({ paused: !paused })
        if (this.state.logo === 'play') {
            this.setState({ logo: 'pausecircle' })
        }
        if (this.state.logo === 'pausecircle') {
            this.setState({ logo: 'play' })
        }
    }
    _loadHandler = ({ duration }) => {
        this.setState({ duration: duration })
    }
    _progressHandler = ({ currentTime }) => {
        this.setState({ currentTime })
    }
    _seek = value => {
        this.player.seek(value)
    }
    _endHandler = () => {
        if (this.state.index < 2) {
            this.setState({
                index: this.state.index + 1,
                uri: this.state.dataSource[this.state.index + 1].uri,
                name: this.state.dataSource[this.state.index + 1].name,
                singer: this.state.dataSource[this.state.index + 1].singer
            })
        }
        else {
            alert("列表歌曲已播放完毕！")
        }

    }
    _lastSong = () => {
        if (this.state.index > 0) {
            this.setState({
                index: this.state.index - 1,
                uri: this.state.dataSource[this.state.index - 1].uri,
                name: this.state.dataSource[this.state.index - 1].name,
                singer: this.state.dataSource[this.state.index - 1].singer
            })
        }
        else {
            alert("已经到头了哦！")
        }

    }
    _nextSong = () => {
        if (this.state.index < 2) {
            this.setState({
                index: this.state.index + 1,
                uri: this.state.dataSource[this.state.index + 1].uri,
                name: this.state.dataSource[this.state.index + 1].name,
                singer: this.state.dataSource[this.state.index + 1].singer
            })
        }
        else {
            alert("已没有下一首歌！")
        }
    }
    _muteJudgment = () => {
        if (this.state.muteLoge === 'sound') {
            this.setState({
                muteLoge: 'sound-mute'
            })
        }
        if (this.state.muteLoge === 'sound-mute') {
            this.setState({
                muteLoge: 'sound'
            })
        }

    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
                <View style={{ width: screenWidth, alignItems: 'center' }}>
                    <View>
                        <Text style={{ fontSize: 18 }}>{this.state.name}</Text>
                        <Text>{this.state.singer}</Text>
                    </View>

                    {/* <TouchableOpacity onPress={this._muteJudgment}>
                        <Entypo name={this.state.muteLoge} size={35} style={{ marginLeft: screenWidth * 0.8 }}></Entypo>
                    </TouchableOpacity> */}

                </View>
                {/* <View style={{ height: screenHeight * 0.35, width: screenHeight * 0.35, backgroundColor: 'black', marginTop: screenHeight * 0.07 }}></View> */}
                <Image style={{ height: screenHeight * 0.35, width: screenHeight * 0.35, marginTop: screenHeight * 0.07 }} source={{ uri: this.props.route.params.img }}></Image>
                <View style={{ flexDirection: 'row' }}>
                    <Video
                        ref={ref => this.player = ref}
                        source={{ uri: this.state.uri }}
                        paused={this.state.paused}
                        onProgress={this._progressHandler}
                        progressUpdateInterval={1000}
                        onLoad={this._loadHandler}
                        onEnd={this._endHandler}
                        muted={this.state.muteJudgment}
                        playInBackground={true}
                    />
                    <View style={{ flexDirection: 'row', marginTop: screenHeight * 0.1 }}>
                        <Text>{parseInt(this.state.currentTime / 60)}:{parseInt(this.state.currentTime % 60)}</Text>
                        <Slider
                            onSlidingComplete={this._seek}
                            minimumValue={0}
                            maximumValue={this.state.duration}
                            value={this.state.currentTime}
                            step={1}
                            style={{ width: screenWidth * 0.8 }}
                        />
                        <Text>{parseInt(this.state.duration / 60)}:{parseInt(this.state.duration % 60)}</Text>
                    </View>

                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: screenHeight * 0.03 }}>
                    <TouchableOpacity onPress={this._lastSong} style={{ marginRight: screenWidth * 0.07 }}>
                        <AntDesign name="banckward" size={40}></AntDesign>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._play}>
                        <View>
                            <AntDesign name={this.state.logo} size={60}></AntDesign>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._nextSong} style={{ marginLeft: screenWidth * 0.07 }}>
                        <AntDesign name="forward" size={40}></AntDesign>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}
