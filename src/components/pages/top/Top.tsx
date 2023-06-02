import React, { ReactNode, useEffect, useState } from "react";
import { GetGoogleMapApiKey } from "~/utils/Environment";
import GoogleMapReact from "google-map-react";
import styles from "~/styles/Top.module.css";

type Props = {
  children: ReactNode;
};

const Component: React.FC<Props> = (props) => (
  <div className={styles.mapWrapper}>{props.children}</div>
);

const Container: React.FC<Props> = () => {
  const [position, setPosition] = useState({
    latitude: undefined,
    longitude: undefined,
  });

  // 現在の位置情報の取得
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setPosition({ latitude, longitude });
    });
  }, []);

  // デフォルト値の設定
  const defaultData = {
    center: {
      lat: position.latitude,
      lng: position.longitude,
    },
    zoom: 14,
  };
  console.log(position);

  return (
    <Component>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GetGoogleMapApiKey() }}
        defaultCenter={defaultData.center}
        defaultZoom={defaultData.zoom}
      />
    </Component>
  );
};

export default Container;
