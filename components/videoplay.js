import React, { useEffect, useRef } from 'react';
import { Video } from 'expo-av';
const Vidplay = ({ sourceUri }) => {

  const videoRef = useRef(null);

  useEffect(() => {
    (async () => {
      // Load the video
      await videoRef.current.loadAsync({ uri: sourceUri });

      // Enable looping
      videoRef.current.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          videoRef.current.replayAsync();
        }
      });
      videoRef.current.setIsMutedAsync(true);

      // Start playing
      videoRef.current.playAsync();
    })();

    // Clean up
    return () => {
      videoRef.current.unloadAsync();
    };
  }, [sourceUri]);

  return (
    <Video
      ref={videoRef}
      style={{ alignSelf:'center', height:250,width:  400}}
      resizeMode="cover"
        isMuted={true}
      shouldPlay={false}
      isLooping={false}
    />
  );
};

export default Vidplay;