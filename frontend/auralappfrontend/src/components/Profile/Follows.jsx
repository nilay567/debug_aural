import React from 'react'
import { github } from '../../assets'

export default function Follows  () {
  return (
    <div>
            <div className="self-stretch overflow-hidden flex flex-row items-center justify-center py-[60px] px-[170px] relative gap-[60px] z-[4]">
        <div className="flex-1 flex flex-col items-start justify-start gap-[24px] z-[0]">
          <p className="m-0 self-stretch relative leading-[48px] font-bold">
            Follows and Following
          </p>
          <div className="self-stretch flex flex-col items-start justify-center py-5 px-0 text-center text-xl">
            <div className="self-stretch flex flex-row items-center justify-center py-4 px-0 relative gap-[16px]">
              <div className="relative rounded-11xl bg-gray-200 w-[60px] h-[60px] z-[0] text-18xl-5">
                <div className="absolute top-[calc(50%_-_30px)] left-[calc(50%_-_30px)] leading-[60px] flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap w-[60px] h-[60px]">
                  🔍
                </div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-start z-[1] text-left">
                <div className="self-stretch relative leading-[28px]">
                  Followers
                </div>
                <div className="self-stretch relative text-base leading-[24px] text-gray-300">
                  548
                </div>
+              </div>
              <div className="relative leading-[28px] font-medium text-right z-[2]">
                View followers
              </div>
              <img
                className="absolute my-0 mx-[!important] w-full right-[0px] bottom-[-0.5px] left-[0px] max-w-full overflow-hidden h-px z-[3]"
                alt=""
                src="/vector-2001.svg"
              />
            </div>
            <div className="self-stretch flex flex-row items-center justify-center py-4 px-0 relative gap-[16px]">
              <div className="relative rounded-11xl bg-gray-200 w-[60px] h-[60px] z-[0] text-18xl-5">
                <div className="absolute top-[calc(50%_-_30px)] left-[calc(50%_-_30px)] leading-[60px] flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap w-[60px] h-[60px]">
                  👥
                </div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-start z-[1] text-left">
                <div className="self-stretch relative leading-[28px]">
                  Following
                </div>
                <div className="self-stretch relative text-base leading-[24px] text-gray-300">
                  702
                </div>
              </div>
              <div className="relative leading-[28px] font-medium text-right z-[2]">
                View following
              </div>
              <img
                className="absolute my-0 mx-[!important] w-full right-[0px] bottom-[-0.5px] left-[0px] max-w-full overflow-hidden h-px z-[3]"
                alt=""
                src="/vector-2001.svg"
              />
            </div>
          </div>
        </div>
        <div className="flex-1 h-[296px] overflow-hidden flex flex-row items-start justify-start py-5 px-0 box-border z-[1]">
          <img
            className="self-stretch flex-1 relative bg-black rounded-md max-w-full overflow-hidden max-h-full object-cover"
            alt=""
            src={github}
          />
        </div>
        <img
          className="absolute my-0 mx-[!important] w-full right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden h-[0.5px] z-[2]"
          alt=""
          src="/vector-200.svg"
        />
      </div>
    </div>
  )
}

