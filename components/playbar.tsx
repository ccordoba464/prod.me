import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";

const Playbar = () => {
  return (
    <div className="fixed bottom-0 flex w-full py-6 items-center justify-center">
      <div className="bg-red-300 flex p-1 rounded-lg">
        <div className="flex mr-4">
          <div className="w-[50px] h-[50px] overflow-hidden bg-[#3b4045] rounded-md mr-2"></div>
          <div className="flex flex-col text-sm justify-center ">
            <div>Title</div>
            <div>Artist</div>
          </div>
        </div>

        <div className="flex gap-2 mr-4">
          <button>Restart</button>
          <button>Play</button>
          <button>Skip</button>
        </div>

        <div className="flex w-40 mr-4">
          <Slider aria-label="slider-ex-1" defaultValue={30}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </div>

        <div className="flex items-center relative">
          <div className="flex justify-center">Volume</div>
          <div className="absolute bottom-[60px] bg-red-300 p-2 rounded-md left-1/2 transform -translate-x-1/2">
            <Slider
              aria-label="slider-ex-3"
              defaultValue={30}
              orientation="vertical"
              minH="20"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </div>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Playbar;
