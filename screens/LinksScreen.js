import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { getAllRecordings } from "../firebase";
import moment from "moment";
import { Audio } from "expo";

export default class LinksScreen extends React.Component {
  constructor() {
    super();
    this.recordings = [];
    this.soundObject = null;
    this.state = {
      audioIndex: 0,
    }
    this.playNext = this.playNext.bind(this);
    this.playRecording = this.playRecording.bind(this);
  }
  static navigationOptions = {
    title: "Links",
  };

  async componentDidMount() {
    this.recordings = await getAllRecordings();
    this.setState({
      audioIndex: 0,
    })
  }

  async playRecording() {
    if (this.soundObject !== null) {
      await this.soundObject.unloadAsync();
      this.soundObject.setOnPlaybackStatusUpdate(null);
      this.soundObject = null;
    }
    this.soundObject = new Expo.Audio.Sound();
    try {
      await this.soundObject.loadAsync({ uri: this.recordings[this.state.audioIndex].url });
      await this.soundObject.playAsync();
      this.soundObject.setOnPlaybackStatusUpdate(update => {
        if (update.didJustFinish) {
          console.log("finished!");
          this.playNext();
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  playNext() {
    console.log("click!");
    this.setState({ audioIndex: this.state.audioIndex < (this.recordings.length - 1) ? this.state.audioIndex + 1 : 0}, () => this.playRecording());
  }

  render() {
    const currentRecording = this.recordings[this.state.audioIndex];
    return (
      <ScrollView style={styles.container}>
        {currentRecording && (
          <View>
            <Text onPress={this.playNext}>{currentRecording.url}</Text>
            <Text>{moment(currentRecording.timestamp).fromNow()}</Text>
            <Text onPress={this.playRecording}>Play recording</Text>
          </View>
        )}
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
