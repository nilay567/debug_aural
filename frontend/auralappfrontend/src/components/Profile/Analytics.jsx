import React from 'react'
import { carrent, github } from '../../assets'
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { projects } from "../../constants/index"
import { fadeIn, textVariant } from "../../utils/motion";
import SectionWrapper from "../../hoc/SectionWrapper"
const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
      <motion.div variants={fadeIn("right", "spring", index * 0.5, 2)} className='flex'>
          <Tilt
              options={{
                  max: 45,
                  scale: 1,
                  speed: 450,
              }}
              className='bg-blue-200 p-5 border-2 border-blue-800 rounded-2xl w-[200px] sm:w-[200px] md:w-[250px] lg:w-[400px] h-[20.5rem] sm:h-[20.5rem] lg:h-[25.5rem] mx-2 my-2 flex-shrink'
          >
              <div className='relative w-full h-[100px] flex-shrink'>
                  <img
                      src={image}
                      alt='project_image'
                      className='w-full h-full object-contain rounded-2xl'
                  />

                  <div className='absolute inset-0 flex justify-end m-3 card-img_hover flex-shrink'>
                      <div
                          onClick={() => window.open(source_code_link, "_blank")}
                          className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer flex-shrink'
                      >
                          <img
                              src={github}
                              alt='source code'
                              className='w-1/2 h-1/2 object-contain'
                          />
                      </div>
                  </div>
              </div>

              <div className='mt-5'>
                  <h3 className='text-white font-bold text-[24px]'>{name}</h3>
                  <p className='mt-2 text-secondary text-[14px]'>{description}</p>
              </div>

              <div className='mt-4 flex flex-wrap gap-2 flex-shrink'>
                  {tags.map((tag) => (
                      <p
                          key={`${name}-${tag.name}`}
                          className={`text-[14px] ${tag.color}`}
                      >
                          #{tag.name}
                      </p>
                  ))}
              </div>
          </Tilt>
      </motion.div>
  );
};
const Analytics = () => {
  return (
    
      <div className="self-stretch overflow-hidden flex flex-row items-center justify-center flex-wrap px-2 sm:px-2 my-[2rem] relative gap-[60px] z-[5]">
        <div className=" flex flex-col items-start justify-start gap-[24px] z-[0]">
          <b className="self-stretch relative text-[48px]">Analytics</b>
          <div className="self-stretch relative text-base leading-[24px]">
            Measure your progress and analysis
          </div>
          <div className="self-stretch flex flex-col items-start justify-center py-5 px-0 text-center text-xl">
            <div className="self-stretch flex flex-row items-center justify-center py-4 px-0 relative gap-[16px]">
              <div className="relative rounded-11xl bg-gray-200 w-[60px] h-[60px] z-[0] text-18xl-5">
                <div className="absolute top-[calc(50%_-_30px)] left-[calc(50%_-_30px)] leading-[60px] flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap w-[60px] h-[60px]">
                  📊
                </div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-start z-[1] text-left">
                <div className="self-stretch relative leading-[28px] text-[15px] sm:text-[20px]">
      
                  Progress
                 
                </div>
                <div className="self-stretch relative text-base leading-[24px] text-[15px] sm:text-[20px] text-gray-300">
                  Courses
                </div>
              </div>
              <div className="relative leading-[28px] font-medium text-right text-[15px] sm:text-[20px] z-[2] ">
              <button className='hover:text-gray-500'>

View  Progress
</button>
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
                  📈
                </div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-start z-[1] text-left">
                <div className="self-stretch relative leading-[28px] text-[15px] sm:text-[20px]">
                  Mistakes
                </div>
                <div className="self-stretch relative text-base leading-[24px] text-gray-300 text-[15px] sm:text-[20px]">
                  Courses
                </div>
              </div>
              <div className="relative leading-[28px] font-medium text-right z-[2] text-[15px] sm:text-[20px]">
              <button className='hover:text-gray-500'>

View  Mistakes
</button>
              </div>

            </div>
            <div className="self-stretch flex flex-row items-center justify-center py-4 px-0 relative gap-[16px]">
              <div className="relative rounded-11xl bg-gray-200 w-[60px] h-[60px] z-[0] text-18xl-5">
                <div className="absolute top-[calc(50%_-_30px)] left-[calc(50%_-_30px)] leading-[60px] flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap w-[60px] h-[60px]">
                  📉
                </div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-start z-[1] text-left">
                <div className="self-stretch relative leading-[28px] text-[15px] sm:text-[20px]">
                  SWOT Analysis
                </div>
                <div className="self-stretch relative text-base leading-[24px] text-gray-300">
                  Courses
                </div>
              </div>
              <div className="relative leading-[28px] font-medium text-right z-[2] text-[15px] sm:text-[20px]">
              <button className='hover:text-gray-500'>

View  SWOT Analysis
</button>
              </div>
              <img
                className="absolute my-0 mx-[!important] w-full right-[0px] bottom-[-0.5px] left-[0px] max-w-full overflow-hidden h-px z-[3]"
                alt=""
                src="/vector-2001.svg"
              />
            </div>
          </div>
        </div>
        <div className="flex h-auto w-auto overflow-hidden flex-row items-start justify-center px-0 box-border z-[1]">
            <ProjectCard index={0}
              name = "Shriram"
              description = "Web-based platform that allows users to search, book,"
              tags = {
                [{
                name: "react",
                color: "blue-text-gradient"
              },
              {
                name: "mongodb",
                color: "green-text-gradient"
              },
              {
                name: "tailwind",
                color: "pink-text-gradient"
              }]
            }
              image = {carrent}
              source_code_link = "https://github.com/"
            />
        </div>

      </div>
    
  )
}

export default SectionWrapper(Analytics, "analytics")
