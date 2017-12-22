import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text, View, ScrollView, AlertIOS, Image } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import styles from './style.js'
import theme from '../../common/theme'
import resources from '../../config/resources.js'

import { Touchable, ThumbImage } from '../../components/Base'
import { Screen, HeaderBackBtn, HeaderMenuBtn, HeaderShopcartBtn } from '../../components/Screen'
import { SummaryFooter, CartSkuItemEditable, CartSkuItemDeletable } from '../../components/Shopcart'

class InstanceScreen extends Screen {

  constructor(props) {
    super(props);
  }

  // Header 设置
  static navigationOptions = ({ navigation, screenProps }) => {
    const { i18n, mch, shopcart } = screenProps;
    return {
      title: '结算',
      headerStyle: { backgroundColor: theme.headerBackgroundColor },
      headerTitleStyle: { color: theme.headerTitleFontColor, fontSize: theme.headerTitleFontSize, fontWeight: theme.headerTitleFontWeight },
      headerLeft: (
        <HeaderBackBtn navigation={navigation} />
      ),
    };
  }

  handleSubmit () {
    this.props.dispatch({
      type: 'placeOrderVM/SUBMIT'
    })
  }

  render() {
    const { dispatch, navigation, i18n, auth, shopcart, vm } = this.props;

    return (
      <View style={styles.container}>

        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{i18n.map['total_quantity']}</Text>
            <Text style={styles.summaryValue}>{shopcart.summary.quantityCount || 0}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{i18n.map['total_price']}</Text>
            <Text style={styles.summaryValue}>{shopcart.summary.totalPrice || 0}€</Text>
          </View>
        </View>

        <Touchable onPress={()=>{
          this.navigateTo('ChooseAddressScreen')
        }}>
          <View style={[styles.listItem, styles.listItemAddress]}>
            <View style={styles.listItemLeft}>
              <Image style={styles.listItemIcon} source={resources.lineFormAddressIcon}/>
              <View style={styles.listItemContent}>
              {
                vm.selectedAddress ? [
                  <Text key={1} style={styles.listItemTextTitle}>{vm.selectedAddress.name}, {vm.selectedAddress.phone}</Text>,
                  <Text key={2} style={styles.listItemText}>{vm.selectedAddress.address} {vm.selectedAddress.zip}, {vm.selectedAddress.city}, {vm.selectedAddress.country}</Text>
                ] : <Text style={styles.listItemPlaceholderText}>{i18n.map['choose_address']}</Text>
              }
              </View>
            </View>
            <View style={styles.listItemRight}>
              <Image style={styles.listItemArrow} source={resources.listItemArrow}/>
            </View>
          </View>
        </Touchable>

        <Touchable style={styles.listItem} onPress={()=>{
          this.navigateTo('SelectShippingScreen')
        }}>
          <View style={styles.listItemLeft}>
            <Image style={styles.listItemIcon} source={resources.lineFormDeliveryIcon}/>
            {
              vm.selectedShippingName ? (
                <Text style={styles.listItemText}>{vm.selectedShippingName}</Text>
              ) : (
                <Text style={styles.listItemPlaceholderText}>{i18n.map['choose_shipping']}</Text>
              )
            }
          </View>
          <View style={styles.listItemRight}>
            <Image style={styles.listItemArrow} source={resources.listItemArrow}/>
          </View>
        </Touchable>

        <Touchable style={styles.listItem} onPress={()=>{
          this.navigateTo('SelectPayScreen')
        }}>
          <View style={styles.listItemLeft}>
            <Image style={styles.listItemIcon} source={resources.lineFormPaymentIcon}/>
            {
              vm.selectedPayName ? (
                <Text style={styles.listItemText}>{vm.selectedPayName}</Text>
              ) : (
                <Text style={styles.listItemPlaceholderText}>{i18n.map['choose_payment']}</Text>
              )
            }
          </View>
          <View style={styles.listItemRight}>
            <Image style={styles.listItemArrow} source={resources.listItemArrow}/>
          </View>
        </Touchable>

        <Touchable style={styles.listItem} onPress={()=>{
          this.navigateTo('RemarkInputScreen')
        }}>
          <View style={styles.listItemLeft}>
            <Image style={styles.listItemIcon} source={resources.lineFormRemarkIcon}/>
            {
              vm.remark ? (
                <Text style={styles.listItemText}>{vm.remark}</Text>
              ) : (
                <Text style={styles.listItemPlaceholderText}>{i18n.map['remark']}</Text>
              )
            }
          </View>
          <View style={styles.listItemRight}>
            <Image style={styles.listItemArrow} source={resources.listItemArrow}/>
          </View>
        </Touchable>

        <SummaryFooter i18n={i18n} shopcart={shopcart} onSubmit={()=>{ this.handleSubmit() }} disabled={vm.isLoading}/>
      </View>
    )
  }
}

export default connect(({ i18n, auth, shopcart, placeOrderVM }) => ({ i18n, auth, shopcart, vm: placeOrderVM }))(InstanceScreen);
