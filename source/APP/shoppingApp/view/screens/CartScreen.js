import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import products from "../../consts/products";
import { ScreenContainer } from "react-native-screens";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
const plus = () => {
  alert("add");
};
const sub = () => {
  alert("reduce");
};
const CardItem = ({ item }) => {
  return (
    <View style={styles.containers}>
      <View style={styles.displayFlexRow}>
        <Image style={styles.imageStyle} source={item.img} />
        <View>
          <Text style={styles.nameProduct}> {item.name}</Text>
          <Text> {item.about} </Text>
          <Text style={styles.sizeStyle}> Size: M | Màu: Đen </Text>
          <Text style={styles.priceStyle}> {item.price} </Text>
          <View style={styles.displayFlexRow2}>
            <Text style={{ textTransform: "capitalize" }}> Tạm tính: </Text>
            <TextInput style={styles.inputSubStyle} value={item.price} />
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={plus}>
          <Text style={styles.buttonStyle}> + </Text>
        </TouchableOpacity>
        <TextInput style={styles.inputStyle} value="1" />
        <TouchableOpacity onPress={sub}>
          <Text style={styles.buttonStyle}> - </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Cart = () => {
  return (
    <SafeAreaView>
      <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 10 }}>
        {" "}
        Cart{" "}
      </Text>
      <FlatList
        style={styles.scrollViewStyle}
        data={products}
        renderItem={({ item }) => <CardItem item={item} />}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.totalStyle}>
        <Text style={{ fontSize: 18 }}> Total: </Text>
        <Text style={styles.totalPrice}> ????đ </Text>
      </View>
      <View>
        <TouchableOpacity>
          <Text style={styles.buttonBuy}> BUY </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  imageStyle: {
    maxWidth: 120,
    maxHeight: 140,
    resizeMode: "contain",
    borderWidth: 0.3,
    borderColor: "#000",
  },
  displayFlexRow: { flexDirection: "row" },
  displayFlexRow2: { flexDirection: "row", alignItems: "center" },
  containers: {
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    maxHeight: 300,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  boxLeft: {},
  boxRight: {},
  nameProduct: {
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
    lineHeight: 20,
    maxWidth: 200,
  },
  priceStyle: { color: "#F8A058", fontSize: 18, marginBottom: 10 },
  sizeStyle: { color: "#424242", fontSize: 14, marginBottom: 5, marginTop: 5 },
  inputStyle: {
    marginLeft: 12,
    width: 30,
    height: 30,
    fontSize: 20,
    paddingLeft: 5,
  },
  inputSubStyle: {
    textAlign: "center",
    borderColor: "#000",
    borderWidth: 1,
    width: 100,
    height: 30,
    borderRadius: 5,
    color: "#000",
    fontSize: 13,
    paddingRight: 5,
  },
  buttonStyle: {
    marginLeft: 10,
    marginBottom: 3,
    textAlign: "center",
    borderColor: "#000",
    borderWidth: 1,
    width: 30,
    height: 30,
    borderRadius: 5,
    color: "#000",
    fontSize: 20,
    paddingRight: 5,
  },
  scrollViewStyle: { height: "80%" },
  totalPrice: { fontWeight: "bold", fontSize: 16 },
  totalStyle: {
    marginTop: 10,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
    width: "96%",
  },
  buttonBuy: {
    textAlign: "center",
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    fontWeight: "bold",
    backgroundColor: "#EE9854",
    width: "96%",
    marginLeft: 4,
  },
});
export default Cart;
