import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import RNPickerSelect from "react-native-picker-select";
import { Rating} from "react-native-ratings";
import COLORS from "../../consts/colors";

const DetailsScreen = ({ navigation, route }) => {
  const product = route.params;

  const [quantityValue, setQuantityValue] = useState(0);

  function increaseQuantityHandler() {
    setQuantityValue(function (prev) {
      return prev + 1;
    });
  }

  function decreaseQuantityHandler() {
    setQuantityValue(function (prev) {
      if (prev === 0) return prev;
      return prev - 1;
    });
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 20,
        backgroundColor: COLORS.white,
      }}
    >
      <View style={style.header}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
        <Icon name="shopping-cart" size={28} />
      </View>
      <View style={style.imageContainer}>
        <Image
          source={{uri:product.image[0]}}
          // source={require('../../assets/3.png')}
          style={
            Platform.OS === "ios"
              ? { resizeMode: "contain", flex: 1 }
              : { resizeMode: "contain", flex: 1, width: 400, height: 400 }
          }
        />
      </View>
      <View style={style.detailsContainer}>
        <View
          style={{
            marginLeft: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Rating
            type="star"
            fractions={1}
            startingValue={product.rating}
            readonly
            imageSize={25}
            type="custom"
            tintColor="#F1F1F1"
            style={{ backgroundColor: COLORS.light }}
          />
          <View style={style.priceTag}>
            <Text
              style={{
                marginLeft: 15,
                color: COLORS.white,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              {product.cost}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginLeft: 20,
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            {product.realname}
          </Text>
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>About</Text>
          <Text
            style={{
              color: "grey",
              fontSize: 16,
              lineHeight: 22,
              marginTop: 20,
            }}
          >
            {product.description}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <RNPickerSelect
              style={pickerSelectStyles}
              onValueChange={(value) => console.log(value)}
              placeholder={{
                label: "Select a size...",
                value: null,
              }}
              items={[
                { label: "M", value: "M" },
                { label: "L", value: "L" },
              ]}
            />
            <RNPickerSelect
              style={pickerSelectStyles}
              onValueChange={(value) => console.log(value)}
              placeholder={{
                label: "Select a color...",
                value: null,
              }}
              useNativeAndroidPickerStyle={false}
              items={[
                { label: "Red", value: "Red" },
                { label: "Black", value: "Black" },
                { label: "White", value: "White" },
              ]}
            />
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={decreaseQuantityHandler}>
                <View style={style.borderBtn}>
                  <Text style={style.borderBtnText}>-</Text>
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                  marginHorizontal: 10,
                  fontWeight: "bold",
                }}
              >
                {quantityValue}
              </Text>
              <TouchableOpacity onPress={increaseQuantityHandler}>
                <View style={style.borderBtn}>
                  <Text style={style.borderBtnText}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={style.buyBtn}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Buy
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageContainer: {
    flex: 0.45,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    flex: 0.55,
    backgroundColor: COLORS.light,
    marginHorizontal: 7,
    marginBottom: 7,
    borderRadius: 20,
    marginTop: 30,
    paddingTop: 30,
  },
  line: {
    width: 25,
    height: 2,
    backgroundColor: COLORS.dark,
    marginBottom: 5,
    marginRight: 3,
  },
  priceTag: {
    backgroundColor: COLORS.green,
    width: 100,
    height: 40,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    justifyContent: "center",
  },
  borderBtn: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  borderBtnText: {
    fontWeight: "bold",
    fontSize: 28,
  },
  buyBtn: {
    width: 150,
    height: 50,
    backgroundColor: COLORS.orange,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: 150,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    width: 150,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default DetailsScreen;
