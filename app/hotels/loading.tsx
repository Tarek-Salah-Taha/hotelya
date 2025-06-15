import Spinner from "../_components/Spinner";

function Loading() {
  <div className="grid items-center justify-center">
    <Spinner />
    <p className="text-xl text-primary-200">Loading hotel data...</p>
  </div>;
}

export default Loading;
