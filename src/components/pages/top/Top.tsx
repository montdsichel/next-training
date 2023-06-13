import React, { useCallback, useEffect, useState } from "react";
import { GetGoogleMapApiKey } from "~/utils/Environment";
import GoogleMapReact from "google-map-react";
import styles from "~/components/pages/top/Top.module.scss";
import MapMarker from "~/components/pages/top/MapMarker";

interface Positions {
  lat: number;
  lng: number;
}

type Props = {
  apiKey: string;
  defaultCenter: Positions | undefined;
  defaultZoom: number;
  markerLat: number;
  markerLng: number;
  onMarkerClick: () => void;
};

const Component: React.FC<Props> = (props) => (
  <div className={styles.mapWrapper}>
    {props.defaultCenter && ( // 位置情報がundefined以外なら地図を描画
      <GoogleMapReact
        bootstrapURLKeys={{ key: props.apiKey }}
        defaultCenter={props.defaultCenter}
        defaultZoom={props.defaultZoom}
      >
        <MapMarker
          lat={props.markerLat}
          lng={props.markerLng}
          onClick={props.onMarkerClick}
        />
      </GoogleMapReact>
    )}
  </div>
);

const Container: React.FC = () => {
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
    zoom: 18,
  };

  const handleOnMarkerClick = useCallback(() => {
    // マーカーボタンの挙動
  }, []);

  return (
    <Component
      apiKey={GetGoogleMapApiKey()}
      defaultCenter={defaultData.center}
      defaultZoom={defaultData.zoom}
      markerLat={35.9905095264978}
      markerLng={139.08694775092494}
      onMarkerClick={handleOnMarkerClick}
    />
  );
};

export default Container;
