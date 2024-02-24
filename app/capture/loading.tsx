import FloatingFilter from "@/components/common/floating-filter/floating-filter";

export default async function ExplorePage() {
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
      <div className="flex w-full items-center justify-center">
        <div
          className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        />
        <span>Loading...</span>
      </div>
    </div>
  );
}
