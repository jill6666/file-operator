import useFileSchema from "../hook/useFileSchema";
import MenuItem from "../components/MenuItem";

const MenuPanel = () => {
  const { treeMap } = useFileSchema();

  const root = treeMap?.[0];
  return <div className="w-full">{root && <MenuItem item={root} />}</div>;
};
export default MenuPanel;
