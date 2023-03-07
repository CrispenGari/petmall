import React from "react";
export const useGeolocation = () => {
  const [coords, setCoords] = React.useState<{
    accuracy: number;
    altitude: number | null;
    latitude: number;
    longitude: number;
    speed: number | null;
    heading: number | null;
    altitudeAccuracy: number | null;
    timestamp: number;
  }>();
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && typeof window !== "undefined") {
      window.navigator.geolocation.getCurrentPosition(
        ({
          timestamp,
          coords: {
            accuracy,
            altitude,
            latitude,
            longitude,
            speed,
            heading,
            altitudeAccuracy,
          },
        }) => {
          setCoords({
            accuracy,
            altitude,
            latitude,
            longitude,
            speed,
            heading,
            altitudeAccuracy,
            timestamp,
          });
        },
        (error) => {
          setCoords(undefined);
        },
        { enableHighAccuracy: true }
      );
    }
    return () => {
      mounted = false;
    };
  }, []);

  return {
    coords,
  };
};
