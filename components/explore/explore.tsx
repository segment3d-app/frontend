import FloatingFilter from "../common/floating-filter/floating-filter";

export default function Explore() {
  return (
    <div className="my-8 h-[2000px] w-full">
      <FloatingFilter>
        <div className="mb-4 flex flex-col gap-4 text-center">
          <div className="px-8 text-2xl font-bold">
            Explore the Frontier of 3D Gaussian Here
          </div>
          <div>Create your first NeRF capture today.</div>
        </div>
      </FloatingFilter>
      <div className="grid-col-3 grid"></div>
    </div>
  );
}
