import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Splash from "../components/Splash";
import COLORS from "../../consts/colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import AuthContext from "../../auth/context";
import APIKit from "../../apis/APIKit";
import HomeScreen from "./HomeScreen";

function Login({ navigation }) {
  const authContext = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [data, setData] = useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
  });
  const textInputChange = (val) => {
    if (val.lenght !== 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };
  const handlePasswordChange = (val) => {
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

  useEffect(() => {
    setTimeout(function () {
      setLoading(false);
    }, 2000);
  }, []);

  if (isLoading) return <Splash visible={isLoading} />;

  const onLogin = async () => {
    try {
    const response = await APIKit.post("/users/login", data);

    const user = response.data;

    authContext.setUser(user);
    navigation.navigate('Home');

  } catch (error) {
    console.log(error);
  }
    // try {
    //   const user = response.data;
    //   JSON.stringify(user);
    //   JSON.parse(user.object);
    //   console.log(user);
    //   // authContext.setUser({...user});
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <SafeAreaView>
      <View>
        <Text style={{ marginLeft: "32%", fontSize: 25, fontWeight: "bold" }}>
          Welcome to
        </Text>
        <Text
          style={{
            marginLeft: "25%",
            fontSize: 38,
            fontWeight: "bold",
            color: COLORS.orange,
          }}
        >
          Oliva Shop
        </Text>
      </View>
      <Text style={{ marginLeft: 20, fontSize: 15 }}>Username: </Text>
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
          onChangeText={(val) => textInputChange(val)}
        />

        {data.check_textInputChange ? (
          <Feather name="check-circle" size={22} />
        ) : null}
      </View>
      <Text style={{ marginLeft: 20, fontSize: 15 }}> Password: </Text>
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
      <TouchableOpacity>
        <View style={styles.styleButtons}>
          <Text onPress={onLogin} style={styles.styleInsideBtn}>
            {" "}
            Sign In{" "}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.styleButtons2}>
          <Text style={styles.styleInsideBtn2} onPress={() => navigation.navigate('SignUp')}> Sign Up </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
export default Login;
