import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { TouchableOpacity } from "react-native-gesture-handler";
import APIKit from "../../apis/APIKit";

const NavigateToLogin = (props) => {
  props.navigation.navigate("Login");
};

const SignUp = (props) => {
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
    check_nameInputChange: false,
    check_emailInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });
  const nameInputChange = (val) => {
    if (val.lenght !== 0) {
      setData({
        ...data,
        name: val,
        check_nameInputChange: true,
      });
    } else {
      setData({
        ...data,
        name: val,
        check_nameInputChange: false,
      });
    }
  };
  const emailInputChange = (val) => {
    if (val.lenght !== 0) {
      setData({
        ...data,
        email: val,
        check_emailInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_emailInputChange: false,
      });
    }
  };
  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };
  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };
  const updatePasswordChange = (val) => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const updateConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };
  

  const onSignUp = async () => { 
   const response = await APIKit.post('/users',data);
   console.log(response) 
   NavigateToLogin(props);
  }
  return (
    <SafeAreaView>
      <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 10 }}>
        {" "}
        WELCOME TO SIGN UP{" "}
      </Text>
      <Text style={{ marginLeft: 20, fontSize: 15 }}>Name: </Text>
      <View
        style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 20 }}
      >
        <FontAwesome
          name="user"
          color="#05375a"
          size={20}
          display="inline"
          style={{ marginLeft: 20, marginTop: 5 }}
        />
        <TextInput
          placeholder="Your name"
          style={styles.TextInputStyle}
          onChangeText={(val) => nameInputChange(val)}
        />

        {data.check_nameInputChange ? (
          <Feather name="check-circle" size={22} />
        ) : null}
      </View>
      <Text style={{ marginLeft: 20, fontSize: 15 }}>Email: </Text>
      <View
        style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 20 }}
      >
        <FontAwesome
          name="user"
          color="#05375a"
          size={20}
          display="inline"
          style={{ marginLeft: 20, marginTop: 5 }}
        />
        <TextInput
          placeholder="Your username or email"
          style={styles.TextInputStyle}
          onChangeText={(val) => emailInputChange(val)}
        />

        {data.check_emailInputChange ? (
          <Feather name="check-circle" size={22} />
        ) : null}
      </View>
      <Text style={{ marginLeft: 20, fontSize: 15 }}> Password: </Text>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          marginBottom: 50,
        }}
      >
        <FontAwesome
          name="lock"
          color="#05375a"
          size={20}
          display="inline"
          style={{ marginLeft: 20, marginTop: 5 }}
        />
        <TextInput
          placeholder="Your password"
          secureTextEntry={data.secureTextEntry ? true : false}
          style={styles.TextInputStyle}
          onChangeText={(val) => handlePasswordChange(val)}
        />
        <TouchableOpacity onPress={updatePasswordChange}>
          {data.secureTextEntry ? (
            <Feather name="eye-off" size={22} />
          ) : (
            <Feather name="eye" size={22} />
          )}
        </TouchableOpacity>
      </View>
      <Text style={{ marginLeft: 20, fontSize: 15 }}> Confirm Password: </Text>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          marginBottom: "20%",
        }}
      >
        <FontAwesome
          name="lock"
          color="#05375a"
          size={20}
          display="inline"
          style={{ marginLeft: 20, marginTop: 5 }}
        />
        <TextInput
          placeholder="Your password"
          secureTextEntry={data.confirm_secureTextEntry ? true : false}
          style={styles.TextInputStyle}
          onChangeText={(val) => handleConfirmPasswordChange(val)}
        />
        <TouchableOpacity onPress={updateConfirmPasswordChange}>
          {data.confirm_secureTextEntry ? (
            <Feather name="eye-off" size={22} />
          ) : (
            <Feather name="eye" size={22} />
          )}
        </TouchableOpacity>
      </View>
  

      <TouchableOpacity>
        <View style={styles.styleButtons}>
          <Text onPress={onSignUp} style={styles.styleInsideBtn}> AGREE </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => NavigateToLogin(props)}>
        <View style={styles.styleButtons2}>
          <Text style={styles.styleInsideBtn2}> Back to Sign in </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "5%",
  },
  TextInputStyle: {
    marginLeft: 5,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    padding: 5,
    width: "80%",
    zIndex: 1,
  },
  styleButtons: {
    backgroundColor: "#FF8A8A",
    borderRadius: 10,
    width: "90%",
    marginLeft: "5%",
    height: 40,
  },
  styleButtons2: {
    marginTop: "5%",
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "90%",
    marginLeft: "5%",
    height: 40,
    borderColor: "#FF8A8A",
    borderWidth: 1,
  },
  styleInsideBtn: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 15,
    textTransform: "uppercase",
    fontWeight: "600",
    color: "#FFF",
  },
  styleInsideBtn2: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 15,
    textTransform: "uppercase",
    fontWeight: "600",
    color: "#FF8A8A",
  },
});
export default SignUp;
