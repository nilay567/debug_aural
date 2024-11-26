import React from 'react'
import { github } from '../../assets'
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { projects } from "../../constants"
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
        <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)} className='flex'>
            <Tilt
                options={{
                    max: 45,
                    scale: 1,
                    speed: 450,
                }}
                className='bg-blue-200 border-2 border-blue-800 p-5 rounded-2xl w-[200px] sm:w-[200px] md:w-[250px] lg:w-[300px] h-[20.5rem] sm:h-[20.5rem] lg:h-[20.5rem] mx-2 my-2 flex-shrink'
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
const Achievements = () => {
    return (
        <div className='border-black flex justify-evenly h-auto my-[2.5rem]'>

            <div className='border-black w-full h-auto mx-10 my-0 flex flex-col justify-evenly'>
                <div className='border-black w-full h-[5rem] flex justify-center items-center flex-shrink'>
                    <p className=' text-secondary font-bold text-black text-[48px]'> Achievements</p>
                </div>

                <div className='flex justify-center items-center flex-wrap flex-shrink'>
                    {projects.map((project, index) => (
                        <ProjectCard key={`project-${index}`} index={index} {...project} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SectionWrapper(Achievements)
