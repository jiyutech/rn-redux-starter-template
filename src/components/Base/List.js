import React from 'react'
import { Text, Image, View, StyleSheet, PixelRatio } from 'react-native';
import Touchable from './Touchable'
import resources from '../../config/resources'


  // <Touchable style={styles.listItem} onPress={()=>{
  //   this.navigateTo('SelectShippingScreen')
  // }}>
  //   <View style={styles.listItemLeft}>
  //     <Image style={styles.listItemIcon} source={resources.lineFormDeliveryIcon}/>
  //     {
  //       vm.selectedShippingName ? (
  //         <Text style={styles.listItemText}>{vm.selectedShippingName}</Text>
  //       ) : (
  //         <Text style={styles.listItemPlaceholderText}>{i18n.map['choose_shipping']}</Text>
  //       )
  //     }
  //   </View>
  //   <View style={styles.listItemRight}>
  //     <Image style={styles.listItemArrow} source={resources.listItemArrow}/>
  //   </View>
  // </Touchable>

export class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.list}>
        {this.props.children}
      </View>
    )
  }
}

export class ListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Touchable style={styles.listItem} onPress={this.props.onPress}>
        <View style={styles.listItemLeft}>
          <Text style={styles.listItemText}>{this.props.title}</Text>
        </View>
        <View style={styles.listItemRight}>
          <Image style={styles.listItemArrow} source={resources.listItemArrow}/>
        </View>
      </Touchable>
    )
  }
}

export class Divider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.divider}>
        <Text style={styles.dividerText}>{this.props.title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {

  },

  divider: {
    height: 20,
    backgroundColor: '#fafafa',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
  },
  dividerText: {
    fontSize: 12,
    color: '#6a6a6a'
  },

  listItem: {
    minHeight: 44,
    backgroundColor: '#fff',
    borderBottomColor: 'rgb(222, 222, 222)',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderTopColor: 'rgb(222, 222, 222)',
    borderTopWidth: 1 / PixelRatio.get(),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -1 / PixelRatio.get(),
  },
  listItemAddress: {
    minHeight: 110,
  },
  listItemLeft: {
    paddingLeft: 17,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  listItemIcon: {
    height: 44,
    width: 44,
  },
  listItemContent: {
    minHeight: 20,
    paddingVertical: 12,
    justifyContent: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  listItemText: {
    fontSize: 14,
    lineHeight: 16,
    paddingVertical: 10,
    color: "#000000",
  },
  listItemTextTitle: {
    fontSize: 17,
    color: "#000000"
  },
  listItemPlaceholderText: {
    fontSize: 14,
    color: "#979797"
  },
  listItemRight: {
    width: 17+8+10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  listItemArrow: {
    height: 54,
    width: 28,
  },
})
