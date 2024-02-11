import AlbumCard from "../common/album-card/album-card";
import FloatingFilter from "../common/floating-filter/floating-filter";

export default function Album() {
  return (
    <div className="my-8 w-full">
      <FloatingFilter>
        <div className="mb-4 flex flex-col gap-4 text-center">
          <div className="px-8 text-2xl font-bold">
            Explore the Frontier of 3D Gaussian Here
          </div>
          <div>Create your first NeRF capture today.</div>
        </div>
      </FloatingFilter>
      <div className="grid grid-cols-2 gap-4 px-8 pt-4">
        {Array.from({ length: 5 }).map((_, id) => (
          <div key={id}>
            <AlbumCard />
          </div>
        ))}
      </div>
    </div>
  );
}
