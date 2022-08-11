import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useState } from "react";
import Button from '@mui/material/Button';


export function Sidebar() {
  const [active, setActive] = useState(false);
  return (
    <>
    {!active ? <ProSidebar>
  <Menu iconShape="square">
    <MenuItem icon={<FaGem />}>Dashboard</MenuItem>
    <SubMenu title="Components" icon={<FaHeart />}>
      <MenuItem>Component 1</MenuItem>
      <MenuItem>Component 2</MenuItem>
    </SubMenu>
  </Menu>
</ProSidebar> : <Button onClick={setActive(!active)}>aoba</Button>}
    </>
  );
}

