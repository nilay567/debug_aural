import React from 'react'

const DiscussionGroup = () => {
  return (
    <section className="self-stretch overflow-hidden flex flex-row items-center justify-center py-[60px] px-[170px] relative gap-[60px] z-[7] text-center text-21xl text-black font-roboto">
        <div className="flex-1 flex flex-col items-center justify-start gap-[24px] z-[0]">
          <h2 className="m-0 relative text-inherit leading-[48px] font-bold font-inherit inline-block w-[520px]">
            Discussion Group
          </h2>
          <h4 className="m-0 relative text-base leading-[24px] font-normal font-inherit inline-block w-[520px]">
            Connect with other users and participate in discussions
          </h4>
          <div className="self-stretch flex flex-col items-center justify-center gap-[40px] text-left text-sm">
            <div className="rounded-md box-border w-[600px] overflow-hidden flex flex-col items-center justify-start border-[1px] border-solid border-gray-500">
              <div className="self-stretch flex flex-row items-center justify-start p-3 gap-[8px]">
                <div className="flex-1 flex flex-row items-center justify-start gap-[8px]">
                  <div className="relative rounded-13xl bg-gray-500 w-8 h-8 overflow-hidden shrink-0" />
                  <div className="flex-1 flex flex-col items-start justify-start">
                    <div className="self-stretch relative leading-[20px] font-medium inline-block overflow-hidden text-ellipsis whitespace-nowrap h-5 shrink-0">
                      Jane Smith
                    </div>
                    <div className="self-stretch relative text-xs leading-[16px] text-gray-300 inline-block overflow-hidden text-ellipsis whitespace-nowrap h-4 shrink-0">
                      1 day ago - English Course
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-start text-center text-base">
                  <div className="relative leading-[24px] flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap w-6 h-6 shrink-0">
                    •••
                  </div>
                </div>
              </div>
              <div className="self-stretch h-[300px] overflow-hidden shrink-0 flex flex-row items-start justify-start text-center text-xs">
                <div className="self-stretch flex-1 relative bg-gainsboro">
                  <div className="absolute w-[calc(100%_-_32px)] top-[calc(50%_-_8px)] left-[16px] leading-[16px] flex items-center justify-center h-4">
                    Profile picture of Jane Smith
                  </div>
                  <div className="absolute bottom-[8px] left-[calc(50%_-_22px)] flex flex-row items-center justify-center gap-[4px]">
                    <div className="relative rounded-81xl bg-white w-5 h-1" />
                    <div className="relative rounded-81xl bg-gray-400 w-1 h-1" />
                    <div className="relative rounded-81xl bg-gray-400 w-1 h-1" />
                    <div className="relative rounded-81xl bg-gray-400 w-1 h-1" />
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start p-3 gap-[8px] text-base">
                <h2 className="m-0 self-stretch relative text-inherit leading-[24px] font-normal font-inherit">
                  Hey everyone, I have a question about the last chapter. Can
                  someone help me out?
                </h2>
                <h4 className="m-0 self-stretch overflow-hidden flex flex-row items-center justify-start text-xs font-inherit">
                  <div className="rounded-sm bg-gainsboro overflow-hidden flex flex-row items-center justify-center py-0.5 px-1 border-[0.5px] border-solid border-gray-500">
                    <div className="relative leading-[16px]">Question</div>
                  </div>
                </h4>
                <h3 className="m-0 self-stretch flex flex-row items-center justify-start text-center text-inherit font-inherit">
                  <div className="relative leading-[24px] flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap w-6 h-6 shrink-0">
                    💬
                  </div>
                </h3>
              </div>
            </div>
            <div className="rounded-md box-border w-[600px] overflow-hidden flex flex-col items-center justify-start border-[1px] border-solid border-gray-500">
              <div className="self-stretch flex flex-row items-center justify-start p-3 gap-[8px]">
                <div className="flex-1 flex flex-row items-center justify-start gap-[8px]">
                  <div className="relative rounded-13xl bg-gray-500 w-8 h-8 overflow-hidden shrink-0" />
                  <div className="flex-1 flex flex-col items-start justify-start">
                    <div className="self-stretch relative leading-[20px] font-medium inline-block overflow-hidden text-ellipsis whitespace-nowrap h-5 shrink-0">
                      John Doe
                    </div>
                    <div className="self-stretch relative text-xs leading-[16px] text-gray-300 inline-block overflow-hidden text-ellipsis whitespace-nowrap h-4 shrink-0">
                      2 days ago - Math Course
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-start text-center text-base">
                  <div className="relative leading-[24px] flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap w-6 h-6 shrink-0">
                    •••
                  </div>
                </div>
              </div>
              <div className="self-stretch h-[300px] overflow-hidden shrink-0 flex flex-row items-start justify-start text-center text-xs">
                <div className="self-stretch flex-1 relative bg-gainsboro">
                  <div className="absolute w-[calc(100%_-_32px)] top-[calc(50%_-_8px)] left-[16px] leading-[16px] flex items-center justify-center h-4">
                    Profile picture of John Doe
                  </div>
                  <div className="absolute bottom-[8px] left-[calc(50%_-_22px)] flex flex-row items-center justify-center gap-[4px]">
                    <div className="relative rounded-81xl bg-white w-5 h-1" />
                    <div className="relative rounded-81xl bg-gray-400 w-1 h-1" />
                    <div className="relative rounded-81xl bg-gray-400 w-1 h-1" />
                    <div className="relative rounded-81xl bg-gray-400 w-1 h-1" />
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start p-3 gap-[8px] text-base">
                <h6 className="m-0 self-stretch relative text-inherit leading-[24px] font-normal font-inherit">
                  I just completed the Math assignment. It was challenging but
                  interesting!
                </h6>
                <h6 className="m-0 self-stretch overflow-hidden flex flex-row items-center justify-start text-xs font-inherit">
                  <div className="rounded-sm bg-gainsboro overflow-hidden flex flex-row items-center justify-center py-0.5 px-1 border-[0.5px] border-solid border-gray-500">
                    <div className="relative leading-[16px]">Announcement</div>
                  </div>
                </h6>
                <div className="self-stretch flex flex-row items-center justify-start text-center">
                  <div className="relative leading-[24px] flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap w-6 h-6 shrink-0">
                    💬
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          className="absolute my-0 mx-[!important] w-full right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden h-[0.5px] z-[1]"
          alt=""
          src="/vector-200.svg"
        />
      </section>
  )
}

export default DiscussionGroup
