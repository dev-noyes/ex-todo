import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SwipeListView } from "react-native-swipe-list-view";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const DATA = [{ timestamp: Date.now(), text: "Sample Text" }];
export default function App() {
  const [data, setData] = React.useState(DATA);
  const [text, setText] = React.useState("");

  const addItem = () => {
    const res = { timestamp: Date.now(), text: text };
    setData([...data, res]);
  };

  const deleteItem = (time) => {
    const res = data.filter((item) => item.timestamp !== time);
    setData([...res]);
  };
  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          width: wp(90),
          marginHorizontal: wp(5),
          height: hp(7),
          backgroundColor: "#FFF",
          borderRadius: 20,
          justifyContent: "center",
          paddingHorizontal: wp(5),
          marginBottom: hp(2),
        }}
      >
        <Text style={{ fontSize: hp(2) }}>
          [{index+1}] {item.text}
        </Text>
        <Text style={{ fontSize: hp(1.5) }}>{new Date(item.timestamp).toLocaleString()}</Text>
      </View>
    );
  };
  const renderHiddenItem = ({ item, index }) => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: wp(5), paddingVertical: hp(1) }}>
        <Pressable>
          <Text style={{ fontSize: hp(3) }}>✍🏻</Text>
        </Pressable>
        <Pressable onPress={() => deleteItem(item.timestamp)}>
          <Text style={{ fontSize: hp(3) }}>🗑</Text>
        </Pressable>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView bounces={false}>
        <View style={{ width: wp(100), height: hp(15), paddingHorizontal: wp(5), justifyContent: "center" }}>
          <Text style={{ fontSize: hp(4), fontWeight: "bold" }}>✅ To do list</Text>
        </View>
        <View style={{ width: wp(100), height: hp(75) }}>
          <SwipeListView data={data} renderItem={renderItem} renderHiddenItem={renderHiddenItem} leftOpenValue={wp(10)} rightOpenValue={-wp(10)} />
        </View>
        <View style={{ flexDirection: "row", width: wp(100), height: hp(10), paddingHorizontal: wp(5), justifyContent: "center" }}>
          <TextInput
            value={text}
            placeholder="please input the text"
            onChangeText={(text) => setText(text)}
            style={{ width: wp(70), height: hp(5), backgroundColor: "#ced4da", borderRadius: 10, paddingHorizontal: wp(3) }}
          />
          <Pressable
            style={{
              marginLeft: wp(5),
              borderRadius: 100,
              width: hp(5),
              height: hp(5),
              backgroundColor: "#ced4da",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={addItem}
          >
            <Text style={{ fontSize: hp(3) }}>➕</Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
});
