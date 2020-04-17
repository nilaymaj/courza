import * as React from 'react';
import { Text, Button } from '../../elements';

const Topbar = (props) => {
  return (
    <div className="cz-topbar__wrapper">
      <div className="cz-topbar__text">
        <Text medium>{props.title}</Text>
      </div>
      <div className="cz-topbar__right">
        <Button transparent>Profile</Button>
      </div>
    </div>
  );
};

export default Topbar;
