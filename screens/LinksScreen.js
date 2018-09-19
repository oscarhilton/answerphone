import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { getAllRecordings } from "../firebase";

export default class LinksScreen extends React.Component {
  constructor() {
    super();
    this.recordings = null;
  }
  static navigationOptions = {
    title: "Links",
  };

  async componentDidMount() {
    this.recordings = await getAllRecordings();
    console.log(this.recordings);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Test</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff",
  },
});
