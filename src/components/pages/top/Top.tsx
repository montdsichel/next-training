import React, { useEffect, useState } from "react";
import { GetGoogleMapApiKey } from "~/utils/Environment";
import GoogleMapReact from "google-map-react";
import styles from "~/components/pages/top/Top.module.scss";

interface Positions {
  lat: number;
  lng: number;
}

type Props = {
  apiKey: string;
  defaultCenter: Positions | undefined;
  defaultZoom: number;
};

const Component: React.FC<Props> = (props) => (
  <div className={styles.mapWrapper}>
    {props.defaultCenter && ( // 位置情報がundefined以外なら地図を描画
      <GoogleMapReact
        bootstrapURLKeys={{ key: props.apiKey }}
        defaultCenter={props.defaultCenter}
        defaultZoom={props.defaultZoom}
      />
    )}
  </div>
);

const Container: React.FC = () => {
  const apiKey = GetGoogleMapApiKey();

  // 位置情報の初期化
  const [position, setPosition] = useState<Positions | undefined>(undefined);

  // 現在の位置情報の取得
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
      setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  }, []);

  // デフォルト値の設定
  const defaultData = {
    center: position,
    zoom: 16,
  };

  console.log(position);

  return (
    <Component
      apiKey={apiKey}
      defaultCenter={defaultData.center}
      defaultZoom={defaultData.zoom}
    />
  );
};

export default Container;
