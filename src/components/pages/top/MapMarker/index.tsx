import React, { useCallback } from "react";
import styles from "~/components/pages/top/MapMarker/Index.module.scss";

type Props = {
  lat: number;
  lng: number;
  onClick: () => void;
};

const Component: React.FC<Props> = (props) => (
  <button
    className={styles.marker}
    type="button"
    onClick={props.onClick}
    aria-label="マーカー"
  />
);

const Container: React.FC<Props> = (props) => {
  const handleOnClick = useCallback(() => {
    props.onClick();
  }, [props]);

  return <Component lat={props.lat} lng={props.lng} onClick={handleOnClick} />;
};

export default Container;
