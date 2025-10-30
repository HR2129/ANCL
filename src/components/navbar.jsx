// import Dropdown from './dropdown.jsx'

// const navbar = () => {
//     return (
//         <nav >
//             <div className='flex items-center justify-evenly py-5 max-h-96'>
//                 <img src="./CorporationLogo1_1670.png" alt="" srcset="" className='h-16 w-24' />
//                 <h1 style={{fontSize: '42px'}} className='font-bold  bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent'>धुळे महानगरपालिका, धुळे</h1>
//                 <img src="logo31.png" alt="" />
//             </div>
//             <hr />
//             <div className='flex justify-center items-center pt-2'>
//                 <h1>ULB :</h1>
//                 <div className='mx-2 border border-black rounded-2xl '>
//                     <Dropdown/>
//                 </div>
//             </div>
//         </nav>
//     )
// }

// export default navbar


import { motion } from "framer-motion"
import Dropdown from "./dropdown"

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className=" backdrop-blur-md  sticky top-0 z-50 shadow-xl"
    >
      <div className="flex items-center justify-between py-5 px-8 max-w-7xl mx-auto">
        {/* Left Logo */}
        <motion.img
          src="./CorporationLogo1_1670.png"
          alt="Corporation Logo"
          className="h-10 w-10 md:h-16 md:w-24 object-contain"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />

        {/* Center Title */}
        <motion.h1
          className="responsive-text font-semibold bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent text-center flex-1 mx-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          
        >
          धुळे महानगरपालिका, धुळे
        </motion.h1>

        {/* Right Logo */}
        <motion.img
          src="logo31.png"
          alt="Logo"
          className="w-32 md:w-auto object-contain"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <motion.hr
        className="border-black/30 max-w-7xl mx-auto"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />

      {/* Dropdown Section */}
      <motion.div
        className="flex justify-center items-center gap-3 py-4 px-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <label className="text-lg font-semibold text-red-600">ULB :</label>
        <div className="border border-blue-200 rounded-2xl hover:border-blue-400 transition-colors duration-300">
          <Dropdown />
        </div>
      </motion.div>
    </motion.nav>
  )
}
