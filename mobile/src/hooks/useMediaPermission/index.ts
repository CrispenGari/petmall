import React from "react";
import * as ImagePicker from "expo-image-picker";
const useLocationPermission = () => {
  const [camera, setCamera] = React.useState<boolean>(false);
  const [gallery, setGallery] = React.useState<boolean>(false);
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      (async () => {
        const { granted: camera } =
          await ImagePicker.requestCameraPermissionsAsync();
        if (camera) {
          setCamera(camera);
        } else {
          const { granted: camera } =
            await ImagePicker.requestCameraPermissionsAsync();
          setCamera(camera);
        }

        const { granted: gallery } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (gallery) {
          setGallery(gallery);
        } else {
          const { granted: gallery } =
            await ImagePicker.requestCameraPermissionsAsync();
          setGallery(gallery);
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, []);
  return { camera, gallery };
};

export default useLocationPermission;
