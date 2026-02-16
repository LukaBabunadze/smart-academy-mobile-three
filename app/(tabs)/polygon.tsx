// import { StyleSheet, Text, View } from "react-native";
// import * as Device from "expo-device";

// const polygon = () => {
//   console.log("device: ", Device);
//   return (
//     <View>
//       <Text>{Device.brand}</Text>
//       <Text>{Device.manufacturer}</Text>
//       <Text>{Device.deviceType}</Text>
//       <Text>{Device.designName}</Text>
//       <Text>{Device.deviceName}</Text>
//       <Text>{Device.deviceYearClass}</Text>
//       <Text>{Device.totalMemory}</Text>
//       <Text>{Device.isDevice ? 'aris' : 'ar aris'}</Text>
//     </View>
//   );
// };

// export default polygon;

// const styles = StyleSheet.create({});

// import { useEvent } from "expo";
// import { useVideoPlayer, VideoView } from "expo-video";
// import { StyleSheet, View, Button, useWindowDimensions } from "react-native";

// const videoSource = "https://www.w3schools.com/tags/mov_bbb.mp4";

// export default function VideoScreen() {
//   const { width, height } = useWindowDimensions();

//   console.log(width, height)

//   const player = useVideoPlayer(videoSource, (player) => {
//     player.loop = true;
//     player.play();
//   });

//   const { isPlaying } = useEvent(player, "playingChange", {
//     isPlaying: player.playing,
//   });

//   return (
//     <View style={styles.contentContainer}>
//       <VideoView
//         style={styles.video}
//         player={player}
//         allowsFullscreen
//         allowsPictureInPicture
//       />
//       <View style={styles.controlsContainer}>
//         <Button
//           title={isPlaying ? "Pause" : "Play"}
//           onPress={() => {
//             if (isPlaying) {
//               player.pause();
//             } else {
//               player.play();
//             }
//           }}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   contentContainer: {
//     flex: 1,
//     padding: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 50,
//   },
//   video: {
//     width: 350,
//     height: 275,
//   },
//   controlsContainer: {
//     padding: 10,
//   },
// });

import { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import * as Device from "expo-device";

import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const getCurrentLocation = async () => {
    if (Platform.OS === "android" && !Device.isDevice) {
      setErrorMsg(
        "Oops, this will not work on Snack in an Android Emulator. Try it on your device!",
      );
      return;
    }
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  console.log(location);

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location?.coords.latitude ?? 37.785834,
            longitude: location?.coords.longitude ?? -120.406417,
            latitudeDelta: 0.5922,
            longitudeDelta: 0.5421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location?.coords.latitude ?? 37.785834,
              longitude: location?.coords.longitude ?? -120.406417,
            }}
            title="My Location"
            description="This is a test marker"
          />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  map: {
    width: "100%",
    height: "50%",
  },
});
