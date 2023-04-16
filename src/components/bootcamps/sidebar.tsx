import FilterForm from "./filterForm";
import LocationForm from "./locationForm";

const Sidebar = () => {
  return (
    <div className="col-md-4">
      <LocationForm></LocationForm>
      <FilterForm></FilterForm>
    </div>
  );
};

export default Sidebar;
