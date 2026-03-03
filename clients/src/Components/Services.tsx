import { BsShieldFillCheck } from "react-icons/bs" 
import {BiSearchAlt} from 'react-icons/bi';
import {RiHeart2Fill} from 'react-icons/ri'

const ServiceCard = ({color,title,icon,subtitle}:{color:string,title:string,icon:React.ReactNode,subtitle:string}) => (
  <>
  <div className="flex flex-row p-3 m-2 rounded-lg cursor-pointer hover:shadow-xl white-glassmorphism w-150">
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h1 className="mt-2 text-white text-lg">{title}</h1> 
      <p className="mt-1 text-white text-sm md:w-9/12">{subtitle}</p>
    </div>
  </div>
        </>
                           
)



const Services = () => {
  return (
    <>
    <div className="flex flex-row w-full justify-center items-center gradient-bg-services h-auto px-40 py-6">
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
        <div className="flex-1 flex flex-col justify-start items-start">  
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-2">Services that we <br /> continue, to improve</h1>

          </div>
        </div>
        <div className="flex-1 flex flex-col justify-start items-center">
              <ServiceCard
              color ='bg-[#2952e3]'
              title = 'Security Guaranteed'
              icon = {<BsShieldFillCheck fontSize={21} className='text-white'/>}
              subtitle = 'Your security and privacy is our priority.'
              />

              <ServiceCard
              color ='bg-[#8945f8]'
              title = 'Best Exchange Rates'
              icon = {<BiSearchAlt fontSize={21} className='text-white'/>}
              subtitle = 'We offer the best exchange rates in the market.'
              />
    
              <ServiceCard
              color ='bg-[#f84550]'
              title = 'Fastest Transactions'  
              icon = {<RiHeart2Fill fontSize={21} className='text-white'/>}
              subtitle = 'Experience lightning fast transactions with us.'
              />

        </div>
      </div>
    </>
    
  )
}

export default Services