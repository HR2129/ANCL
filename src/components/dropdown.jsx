// import { useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { useNavigate } from "react-router"

// const dropdownOptions = [
//   { label: "Property Tax", path: "/property-tax" },
//   { label: "Market", path: "/market" },
//   { label: "Estate", path: "/estate" },
//   { label: "Marriage", path: "/marriage" },
//   { label: "Birth and Death", path: "/birth-death" },
//   { label: "CFC", path: "/cfc" },
//   { label: "Right to Service", path: "/right-to-service" },
//   { label: "Fire Department", path: "/fire-department" },
// ]

// export default function Dropdown() {
//   const [selected, setSelected] = useState("Select ULB")
//   const router = useNavigate()

//   const handleSelect = (option) => {
//     setSelected(option.label)
//     router.push(option.path)
//   }

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <motion.button
//           className="w-64 px-4 py-2 text-left font-medium text-red-600 focus:outline-none focus:ring-0 active:ring-0 transition-colors duration-300"
//           whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
//           whileTap={{ scale: 0.98 }}
//         >
//           {selected}
//         </motion.button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent className="w-72">
//         <AnimatePresence>
//           {dropdownOptions.map((option, index) => (
//             <motion.div
//               key={option.path}
//               initial={{ opacity: 0, x: -10 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -10 }}
//               transition={{ duration: 0.2, delay: index * 0.05 }}
//             >
//               <DropdownMenuItem
//                 onClick={() => handleSelect(option)}
//                 className="cursor-pointer hover:bg-blue-50  transition-colors duration-200"
//               >
//                 <motion.span whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
//                   {option.label}
//                 </motion.span>
//               </DropdownMenuItem>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }



import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const dropdownOptions = [
  { label: "Amravati Municipal Corporation", path: "/property-tax" },
  { label: "Dhule Municipal Corporation-dummy", path: "/market" },
  { label: "Final Test Kbmc", path: "/estate" },
  { label: "Vasai Virar City Municipal Corporation", path: "/marriage" },
  { label: "असेन्टेक टेस्ट", path: "/birth-death" },
  { label: "अहिल्यानगर महानगरपालिका, अहिल्यानगर", path: "/cfc" },
  { label: "इचलकरंजी शहर महानगरपालिका", path: "/cfc" },
  { label: "उरुण - इस्लामपूर नगरपरिषद", path: "/cfc" },
  { label: "उल्हासनगर महानगरपालिका", path: "/cfc" },
  { label: "कुळगाव बदलापूर नगरपरिषद बदलापूर", path: "/cfc" },
  { label: "कोल्हापूर महानगरपालिका, कोल्हापूर ", path: "/cfc" },
  { label: "खामगाव नगर परिषद ", path: "/cfc" },
  { label: "Right to Service", path: "/right-to-service" },
  { label: "Fire Department", path: "/fire-department" },
]

export default function Dropdown() {
  const [selected, setSelected] = useState("-- Select Option --")
  const navigate = useNavigate()

  const handleSelect = (option) => {
    setSelected(option.label)
    navigate(`${option.path}?ulb=${encodeURIComponent(option.label)}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          className="w-64 px-4 py-2 text-left font-medium text-red-600 focus:outline-none focus:ring-0 active:ring-0 transition-colors duration-300"
          whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
          whileTap={{ scale: 0.98 }}
        >
          {selected}
        </motion.button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 bg-blue-500/30">
        <AnimatePresence>
          {dropdownOptions.map((option, index) => (
            <motion.div
              key={option.path}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <DropdownMenuItem
                onClick={() => handleSelect(option)}
                className="cursor-pointer text-red-600  hover:bg-blue-50 transition-colors duration-200"
              >
                <motion.span whileHover={{ x: 4 , color: 'blue' }} transition={{ duration: 0.2 }}>
                  {option.label}
                </motion.span>
              </DropdownMenuItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
