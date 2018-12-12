
'use strict';
import React from "react"
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    SectionList,
    FileList,
    ListView
} from 'react-native';
const { width, height } = Dimensions.get('window');
// 适配性函数
const UIWIDTH = 750
export function rx(UIPX) {
    return Math.round(UIPX * width / UIWIDTH);
}
import cityIndex from "./cityIndex"
// 字母的高度
const CONTENT_LIST_INDEX = rx(60)
// 每一个城市的高度
const CONTENT_LIST_TAG = rx(80)
export default class CityList extends React.Component {
    constructor(props) {
        super(props);
        this.dSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.sectionList = null
        this.dealCity()
    }
    componentDidMount = () => {
        this.initPage()
    }
    // 此页面初始化
    initPage = () => {
        this.sectionList = this.refs.sectionList

    }
    //  二次处理数据
    dealCity = () => {
        // 在最前面追加数据
        let p = cityIndex
        // p.unshift({ sortLetters: "最近", data: [{ name: "郑州1" }, { name: "北京2" }, { "name": "上海3" }] })
        p.unshift({ sortLetters: "定位", data: [{ name: "郑州" }] })
    }
    _renderSectionHeader = ({ section }) => {
        return (<View style={styles.contentListIndex}>
            <Text style={styles.contentListIndexText}>{section["sortLetters"]}</Text>
        </View>)

    }
    _renderItem = ({ item, section }) => {
        if (section["sortLetters"] == "定位") {
            return (<TouchableOpacity onPress={() => {
                this.selectCity(item)
            }}><View style={[styles.contentListTag, styles.contentListTagMap]}>
                    <View style={[styles.contentListTagTextMap]}>
                        <Text style={styles.contentListTagTextMapIn}>郑州</Text>
                    </View>
                </View></TouchableOpacity>)
        } else {
            return (<TouchableOpacity onPress={() => {
                this.selectCity(item)
            }}><View style={styles.contentListTag}>
                    <Text style={styles.contentListTagText}>{item["name"]}</Text>
                </View></TouchableOpacity>)
        }
    }

    _renderHistory = () => {
        return (<View style={[styles.contentListTag, styles.contentListTagMap]}>
            {section["data"].map(itemIn => {
                return (<TouchableOpacity><View style={[styles.contentListTagTextMap]}>
                    <Text style={styles.contentListTagTextMapIn}>{itemIn["name"]}</Text>
                </View></TouchableOpacity>)
            })}
        </View>)
    }
    _scrollTo = (index) => {
        // console.log(index)
        this.sectionList.scrollToLocation({
            animated: true,
            sectionIndex: index,
            itemIndex: 0,
            // 补偿高度偏移
            viewOffset: CONTENT_LIST_TAG * 4,
            // viewOffset:0
        })
    }
    selectCity = (cityItem) => {
        console.log(cityItem)
    }
    render = () => {
        // 右侧列表
        let rightIndex = [...cityIndex.map((item, index) => {
            return (<TouchableOpacity key={item["sortLetters"]} onPress={() => {

                this._scrollTo(index)
            }}><View style={styles.indexBox}>
                    <Text style={styles.indexText}>{item["sortLetters"]}</Text>
                </View></TouchableOpacity>)
        })]
        return (<View style={styles.page}>
            <View style={styles.container}>
                {/** 1.选择当前的定位*/}
                {/** 2.渲染最近打开的地理位置*/}
                {/** 3.渲染整个列表*/}
                <View style={styles.contentContainer}>
                    <View style={styles.contentList}>
                        <SectionList
                            ref="sectionList"
                            stickySectionHeadersEnabled={true}
                            sections={cityIndex}
                            renderSectionHeader={this._renderSectionHeader}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => "" + index}
                            getItemLayout={(data, index) => {
                                return {
                                    index,
                                    // 偏移高度 = 每一个城市(CONTENT_LIST_TAG)x数量+字母高度(CONTENT_LIST_INDEX)
                                    offset: CONTENT_LIST_TAG * (index) + CONTENT_LIST_INDEX,
                                    length: CONTENT_LIST_TAG
                                }
                            }}
                        ></SectionList>
                    </View>
                </View>
                <View style={styles.rightIndex}>
                    {rightIndex}
                </View>
            </View>
        </View>)
    }
}
const styles = StyleSheet.create({
    page: {
        flex: 1,
        height,
        width,
        backgroundColor: "#f5f5f5"
    },
    // 中间内容
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff"
    },

    contentList: {
        backgroundColor: "#fff",
    },
    // 1.选择当前的定位
    // 定位的样式
    // 2.渲染最近打开的地理位置
    contentListTagMap: {
        height: CONTENT_LIST_TAG,
        width,
        paddingHorizontal: rx(20),
        backgroundColor: "#f5f5f5",
        flexDirection: "row",
        alignItems: "center",
    },
    contentListTagTextMap: {
        height: CONTENT_LIST_TAG,
        width: (width - 30) / 3,
        backgroundColor: "#f5f5f5",
    },
    contentListTagTextMapIn: {
        lineHeight: CONTENT_LIST_TAG - rx(30),
        height: CONTENT_LIST_TAG - rx(30),
        width: (width - 40) / 3,
        textAlign: "center",
        backgroundColor: "#fff",
        color: "#999",
        fontWeight: "bold",
        borderRadius: rx(10),
        borderWidth: 1,
        borderColor: "#ddd",
    },
    // 3.渲染整个列表
    contentListIndex: {
        height: CONTENT_LIST_INDEX,
        width,
        paddingHorizontal: rx(20),
        backgroundColor: "#f5f5f5",
    },
    contentListIndexText: {
        height: CONTENT_LIST_INDEX,
        width,
        lineHeight: CONTENT_LIST_INDEX,
        fontSize: rx(36),
        color: "#f60",
        fontFamily: "iconfont",
    },
    contentListTag: {
        height: CONTENT_LIST_TAG,
        width,
        paddingHorizontal: rx(20),
        backgroundColor: "#fff",
    },
    contentListTagText: {
        height: CONTENT_LIST_TAG,
        width,
        lineHeight: CONTENT_LIST_TAG,
        color: "#999",
        fontWeight: "bold"
    },
    // 右侧
    rightIndex: {
        position: "absolute",
        right: rx(10),
        top: rx(20),
        bottom: 0,
        height,
        backgroundColor: "#fff",
        alignItems: "center"
    },
    indexBox: {
        height: rx(50),
        backgroundColor: "#fff",
    },
    indexText: {
        fontSize: rx(30),
        color: "#f60",
        fontWeight: "bold"
    }
});
