export const OgImage = ({ title }: { title: string }) => {
  return (
    <div
      className="flex bg-white items-center justify-center w-full h-full relative"
      tw="flex bg-white items-center justify-center w-full h-full relative"
    >
      <div
        className="bg-gray-200  border-4 border-gray-700 text-center flex flex-col w-full h-full items-center justify-center mt-20 mb-20 ml-10 mr-10 z-10 rounded-lg"
        tw="bg-gray-200  border-4 border-gray-700 text-center flex flex-col w-full h-full items-center justify-center mt-20 mb-20 ml-10 mr-10 z-10 rounded-lg"
        style={{
          width: "1080px",
          height: "520px",
        }}
      >
        <div
          className="bg-white  border-4 border-gray-700  text-center flex flex-col w-full h-full items-center justify-center p-5 -ml-10 -mb-10 rounded-lg"
          tw="bg-white  border-4 border-gray-700  text-center flex flex-col w-full h-full items-center justify-center p-5 -ml-10 -mb-10 rounded-lg"
        >
          <h1 className="text-4xl flex font-bold" tw="text-4xl flex font-bold">
            {title}
          </h1>
          <h2 className="text-lg flexmt-4 pt-3" tw="text-lg flexmt-4 pt-3">
            @viaymavi
          </h2>
        </div>
      </div>
    </div>
  );
};

export default OgImage;
