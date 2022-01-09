import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMap,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";

export const TabSwitcher = (props) => {
  const activeColor = "#2cb5e8";
  const inactiveColor = "#505050";

  return (
    <div className="tab-switcher">
      <div className="tab-switcher-tab" onClick={() => props.onTabSwitch(0)}>
        <FontAwesomeIcon
          icon={faHome}
          size={"2x"}
          color={props.currentTab === 0 ? activeColor : inactiveColor}
        />
      </div>
      <div className="tab-switcher-tab" onClick={() => props.onTabSwitch(1)}>
        <FontAwesomeIcon
          icon={faMap}
          size={"2x"}
          color={props.currentTab === 1 ? activeColor : inactiveColor}
        />
      </div>
      <div className="tab-switcher-tab" onClick={() => props.onTabSwitch(2)}>
        <FontAwesomeIcon
          icon={faCalendarDay}
          size={"2x"}
          color={props.currentTab === 2 ? activeColor : inactiveColor}
        />
      </div>
    </div>
  );
};
