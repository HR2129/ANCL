// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { motion, AnimatePresence } from "framer-motion"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// const dropdownOptions = [
//   { label: "Amravati Municipal Corporation", path: "/property-tax" },
//   { label: "Dhule Municipal Corporation-dummy", path: "/market" },
//   { label: "Final Test Kbmc", path: "/estate" },
//   { label: "Vasai Virar City Municipal Corporation", path: "/marriage" },
//   { label: "असेन्टेक टेस्ट", path: "/birth-death" },
//   { label: "अहिल्यानगर महानगरपालिका, अहिल्यानगर", path: "/cfc" },
//   { label: "इचलकरंजी शहर महानगरपालिका", path: "/cfc" },
//   { label: "उरुण - इस्लामपूर नगरपरिषद", path: "/cfc" },
//   { label: "उल्हासनगर महानगरपालिका", path: "/cfc" },
//   { label: "कुळगाव बदलापूर नगरपरिषद बदलापूर", path: "/cfc" },
//   { label: "कोल्हापूर महानगरपालिका, कोल्हापूर ", path: "/cfc" },
//   { label: "खामगाव नगर परिषद ", path: "/cfc" },
//   { label: "Right to Service", path: "/right-to-service" },
//   { label: "Fire Department", path: "/fire-department" },
// ]

// export default function Dropdown() {
//   const [selected, setSelected] = useState("-- Select Option --")
//   const navigate = useNavigate()

//   const handleSelect = (option) => {
//     setSelected(option.label)
//     navigate(`${option.path}?ulb=${encodeURIComponent(option.label)}`)
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

//       <DropdownMenuContent className="w-64 bg-blue-500/30">
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
//                 className="cursor-pointer text-red-600  hover:bg-blue-50 transition-colors duration-200"
//               >
//                 <motion.span whileHover={{ x: 4 , color: 'blue' }} transition={{ duration: 0.2 }}>
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


import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UlbContext } from "../context/UlbContex.jsx";


export default function Dropdown() {
  const { ulbID, setUlbID, corporationOptions = [] } = useContext(UlbContext);
  const [selectedLabel, setSelectedLabel] = useState("-- Select ULB --");
  const navigate = useNavigate();

  useEffect(() => {
    const match = corporationOptions.find((o) => String(o.value) === String(ulbID));
    if (match) setSelectedLabel(match.label);
    else setSelectedLabel("-- Select ULB --");
  }, [ulbID, corporationOptions]);

  const handleSelect = (option) => {
    const id = String(option.value);
    setUlbID(id);
    setSelectedLabel(option.label);
    const path = option.path || "/";
    navigate(`${path}?ulbId=${encodeURIComponent(id)}`, { replace: true });
  };

  const isLoading = corporationOptions.length === 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.995 }}
          className="flex items-center gap-3 w-92 md:w-92 px-4 py-2 text-left bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
          disabled={isLoading}
        >
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-semibold">
              {selectedLabel && selectedLabel !== "-- Select ULB --" ? selectedLabel.charAt(0) : "U"}
            </div>
            <div className="truncate">
              <h1 className="text-sm text-gray-800 text-center">{isLoading ? "Loading ULBs..." : selectedLabel}</h1>
              <h1 className="text-xs text-gray-400 ">Tap to switch municipal body</h1>
            </div>
          </div>
        </motion.button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-auto md:w-auto bg-white p-2 rounded-lg shadow-xl border border-gray-100">
        <AnimatePresence>
          {corporationOptions.map((option, idx) => (
            <motion.div
              key={option.value}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.14, delay: idx * 0.02 }}
            >
              <DropdownMenuItem
                onClick={() => handleSelect(option)}
                className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-50 rounded-md"
              >
                <div className="h-8 w-8 flex items-center justify-center">
                  {option.logo ? (
                    <img src={option.logo} alt={option.label} className="h-8 w-8 object-cover rounded-sm" />
                  ) : (
                    <div className="h-8 w-8 bg-blue-100 text-blue-700 rounded-sm flex items-center justify-center text-xs">
                      {option.label?.charAt(0) ?? "U"}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800 truncate">{option.label}</div>
                  <div className="text-xs text-gray-400">ID: {option.value}</div>
                </div>

                {/* <div className="text-xs text-gray-400">Select</div> */}
              </DropdownMenuItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}