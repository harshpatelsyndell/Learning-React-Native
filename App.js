import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  useWindowDimensions,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
} from "react-native";
import Greet from "./components/Greet";
import Box from "./components/Box";

const logo = {
  uri: "https://reactnative.dev/img/tiny_logo.png",
  width: 64,
  height: 64,
};

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBoxModalVisible, setIsBoxModalVisible] = useState(false);
  const [isDynamicUiModalVisible, setIsDynamicUiModalVisible] = useState(false);
  const [isGetModalVisible, setIsGetModalVisible] = useState(false);

  const windowWidth = useWindowDimensions().width;
  const windowheight = useWindowDimensions().height;

  console.log("width", windowWidth);
  console.log("heigth", windowheight);

  // ********Fetch Data**********
  const [postList, setPostList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const fetchdata = async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=10"
    );
    const data = await response.json();
    setPostList(data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const handleRefresh = () =>{
    setRefreshing(true);
    fetchdata();
    setRefreshing(false);
  }

  return (
    <SafeAreaView style={styles.SafeArea}>
      <View
        style={{
          flex: 1,
          backgroundColor: "plum",
          paddingHorizontal: 60,
          gap: 20,
        }}
      >
        {/* <StatusBar backgroundColor="lightgreen" barStyle="dark-content" /> */}
        <Greet name="Harsh" />
        <Button
          title="press"
          onPress={() => setIsModalVisible(true)}
          color="midnightblue"
        />
        <Button
          title="Box Modal"
          onPress={() => setIsBoxModalVisible(true)}
          color="midnightblue"
        />
        <Button
          title="Dynamic UI"
          onPress={() => setIsDynamicUiModalVisible(true)}
          color="midnightblue"
        />
        <Button
          title="Get Request"
          onPress={() => setIsGetModalVisible(true)}
          color="midnightblue"
        />
        <Modal
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
          animationType="slide"
        >
          <View
            style={
              Platform.OS === "web" ? styles.webContainer : styles.container
            }
          >
            <Greet name="Harsh" />
            <Button
              title="close"
              onPress={() => setIsModalVisible(false)}
              color="midnightblue"
            />
            <Button title="alert" onPress={() => Alert.alert("Invalid !!")} />
            <Button
              title="alert 2"
              onPress={() => Alert.alert("Invalid !!", "Description here")}
              color="red"
            />
            <Button
              title="alert 3"
              onPress={() =>
                Alert.alert("Invalid !!", "Description here", [
                  {
                    text: "cancel",
                    onPress: () => console.log("Cancel Button Press"),
                  },
                  {
                    text: "Ok",
                    onPress: () => console.log("Ok Button Press"),
                  },
                ])
              }
            />
            <ActivityIndicator
              size="large"
              color="midnightblue"
              style={{ marginVertical: 20 }}
            />
          </View>
        </Modal>
        {/* box modal  */}
        <Modal
          visible={isBoxModalVisible}
          onRequestClose={() => setIsBoxModalVisible(false)}
          animationType="fade"
        >
          <View style={{ flex: 1, borderWidth: 2, borderColor: "red" }}>
            <Box style={{ backgroundColor: "#8e9b00", flex: 1 }}>Box 1</Box>
            <Box style={{ backgroundColor: "#d65d1f", flex: 1 }}>Box 2</Box>
            <Box style={{ backgroundColor: "#855500", flex: 1 }}>Box 3</Box>
            <Box style={{ backgroundColor: "#83ae00", flex: 1 }}>Box 4</Box>
            <Box style={{ backgroundColor: "#adadad", flex: 1 }}>Box 5</Box>
            <Box style={{ backgroundColor: "#cc332c", flex: 1 }}>Box 6</Box>
            <Box style={{ backgroundColor: "#a44444", flex: 1 }}>Box 77</Box>
          </View>
        </Modal>
        {/* dynamic ui */}
        <Modal
          visible={isDynamicUiModalVisible}
          onRequestClose={() => setIsDynamicUiModalVisible(false)}
          animationType="slide"
        >
          <View style={styles.dynamicUiContainer}>
            <View
              style={[
                styles.dynamicUiBox,
                {
                  width: windowWidth > 500 ? "70%" : "90%",
                  height: windowheight > 600 ? "30%" : "90%",
                },
              ]}
            >
              <Text style={{ fontSize: windowWidth > 500 ? 50 : 24 }}>
                Home
              </Text>
            </View>
          </View>
        </Modal>
        {/* GET */}
        <Modal
          visible={isGetModalVisible}
          onRequestClose={() => setIsGetModalVisible(false)}
          animationType="slide"
        >
          <View style={styles.listContainer}>
            <FlatList
              style={{ paddingHorizontal: 16 }}
              data={postList}
              renderItem={({ item }) => {
                return (
                  <View style={styles.card}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.bodyText}>{item.body}</Text>
                  </View>
                );
              }}
              ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
              ListEmptyComponent={<Text>NO Post Found</Text>}
              ListHeaderComponent={<Text style={styles.headerText}>Post</Text>}
              ListFooterComponent={<Text style={styles.footerText}>Done</Text>}
              refreshing= { refreshing }
              onRefresh={handleRefresh}
            />
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    padding: 60,
    gap: 5,
  },
  webContainer: {
    padding: 0,
  },
  dynamicUiContainer: {
    flex: 1,
    backgroundColor: "plum",
    alignItems: "center",
    justifyContent: "center",
  },
  dynamicUiBox: {
    // width: windowWidth > 500 ? "70%" : "90%",
    // height: windowheight > 600 ? "30%" : "90%",
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
  dynamicUiText: {
    // fontSize: windowWidth > 500 ? 50 : 24,
  },
  SafeArea: {
    flex: 1,
    backgroundColor: "plum",
    ...Platform.select({
      android: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      },
    }),
  },
  listContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  titleText: {
    fontSize: 24,
  },
  bodyText: {
    fontSize: 16,
    color: "#666666",
  },
  headerText:{
    fontSize: 24,
    paddingVertical: 10,
    color: "darkblue",
    textAlign: "center"
  },
  footerText:{
    fontSize: 24,
    paddingVertical: 10,
    color: "darkblue",
    textAlign: "center"
  },
});
