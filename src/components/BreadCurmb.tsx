import size from "lodash/size";
const BreadCrumbs = ({ data }: { data: string[] }) => {
  return (
    <div className="flex items-center p-2 h-10">
      {data &&
        data.map((item, i) => (
          <div key={item + i} className="">
            <span>{item}</span>
            {i !== size(data) - 1 && (
              <i className="ri-arrow-right-s-line px-2"></i>
            )}
          </div>
        ))}
    </div>
  );
};

export default BreadCrumbs;
