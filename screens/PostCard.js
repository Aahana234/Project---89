import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";

export default class PostCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: false,
            light_theme: true,
            post_id: this.props.post.key,
            post_data: this.props.post.value,
            is_liked: false,
            likes: this.props.post.value.likes
        };
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
      }
    
      componentDidMount() {
        this._loadFontsAsync();
        this.fetchUser();
      }
    
      likeAction = () => {
        if (this.state.is_liked) {
          firebase
            .database()
            .ref("posts")
            .child(this.state.post_id)
            .child("likes")
            .set(firebase.database.ServerValue.increment(-1));
          this.setState({ likes: (this.state.likes -= 1), is_liked: false });
        } else {
          firebase
            .database()
            .ref("posts")
            .child(this.state.post_id)
            .child("likes")
            .set(firebase.database.ServerValue.increment(1));
          this.setState({ likes: (this.state.likes += 1), is_liked: true });
        }
      };
    
      fetchUser = () => {
        let theme;
        firebase
          .database()
          .ref("/users/" + firebase.auth().currentUser.uid)
          .on("value", snapshot => {
            theme = snapshot.val().current_theme;
            this.setState({ light_theme: theme === "light" });
          });
      };
    

      render() {
        let post = this.state.post_data;
        if (!this.state.fontsLoaded) {
          return <AppLoading />;
        } else {
          let images = {
            image_1: require("../assets/image_1.jpg"),
            image_2: require("../assets/image_2.jpg"),
            image_3: require("../assets/image_3.jpg"),
            image_4: require("../assets/image_4.jpg"),
            image_5: require("../assets/image_5.jpg"),
            image_6: require("../assets/image_6.jpg"),
            image_7: require("../assets/image_7.jpg")
          };
          return (
            <TouchableOpacity
              style={styles.container}
              onPress={() =>
                this.props.navigation.navigate("PostScreen", {
                  post: post
                })
              }
            >
              <SafeAreaView style={styles.droidSafeArea} />
              <View
                style={
                  this.state.light_theme
                    ? styles.postcardLight
                    : styles.postcardContainer
                }
              >
                <Image
                  source={images[post.preview_image]}
                  style={styles.postImage}
                ></Image>
    
                <View style={styles.titleContainer}>
                  <View style={styles.titleTextContainer}>
                    <Text
                      style={
                        this.state.light_theme
                          ? styles.postTitleTextLight
                          : styles.postTitleText
                      }
                    >
                      {post.title}
                    </Text>
                    <Text
                      style={
                        this.state.light_theme
                          ? styles.postAuthorTextLight
                          : styles.postAuthorText
                      }
                    >
                      {post.author}
                    </Text>
                   
                  </View>
                </View>
    
                <View style={styles.actionContainer}>
                  <TouchableOpacity
                    style={
                      this.state.is_liked
                        ? styles.likeButtonLiked
                        : styles.likeButtonDisliked
                    }
                    onPress={() => this.likeAction()}
                  >
                    <Ionicons
                      name={"heart"}
                      size={RFValue(30)}
                      color={this.state.light_theme ? "black" : "white"}
                    />
    
                    <Text
                      style={
                        this.state.light_theme
                          ? styles.likeTextLight
                          : styles.likeText
                      }
                    >
                      {this.state.likes}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        }
      }
}
const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: "black"
},
droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
},
appTitle: {
    flex: 0.07,
    flexDirection: "row"
},
appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
},
iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
},
appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
},
appTitleText: {
    color: "white",
    fontSize: RFValue(28)
},
postContainer: {
    flex: 1
},
postCard: {
    margin: RFValue(20),
    backgroundColor: "#2a2a2a",
    borderRadius: RFValue(20)
},
postcardLight:{
 margin:RFValue(20),
 backgroundColor:"#eaeaea",
 borderRadius:RFValue(20)
},
actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: RFValue(10)
},
likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    flexDirection: "row",
    backgroundColor: "#eb3948",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(30)
},
likeText: {
    color: "white",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
},
authorContainer: {
    height: RFPercentage(10),
    padding: RFValue(10),
    flexDirection: "row"
},
authorImageContainer: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center"
},
profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: RFValue(100)
},
authorNameContainer: {
    flex: 0.85,
    padding: RFValue(10),
    justifyContent: "center"
},
authorNameText: {
    color: "white",
    fontSize: RFValue(20)
},
authorNameTextLight:{
    color:"black",
    fontSize: RFValue(20)
},
postImage: {                                                    
    width: "100%",
    alignSelf: "center",
    height: RFValue(200),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    resizeMode: "contain"
},
captionContainer: {
    padding: RFValue(10)
},
captionText: {
    fontSize: 13,
    color: "white",
    paddingTop: RFValue(10)
},
});
