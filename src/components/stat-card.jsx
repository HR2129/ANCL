// import { Card } from "@/components/ui/card"
// import { motion } from "framer-motion"
// import { useState } from "react"


// export function StatCard({ icon, title, subtitle, stats }) {
//   const [isHovered, setIsHovered] = useState(false)

//   return (
//     <Card
//       className="relative  duration-700 overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow h-52 cursor-pointer bg-blue-200 "
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Image and Title Section */}
//       <div className="relative w-full h-full p-6 flex flex-col items-center justify-center">
//         <div className="flex flex-col items-center gap-3">
//           <img
//             src={icon || "/placeholder.svg"}
//             alt={title}
//             width={60}
//             height={60}
//             className="w-20 h-20 object-contain"
//           />
//           <div className="text-center">
//             <div className="text-lg font-semibold bg-linear-to-r from-blue-900 to-blue-400 bg-clip-text text-transparent">{title}</div>
//             {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
//           </div>
//         </div>
//       </div>

//       <motion.div
//         initial={{ y: "100%" }}
//         animate={{ y: isHovered ? 0 : "100%" }}
//         transition={{ duration: 0.3, ease: "easeOut" }}
//         className="absolute inset-0 bg-black/30  backdrop-blur-sm p-6 flex flex-col justify-end"
//       >
//         <div className="flex justify-center items-center">
//             <img
//             src={icon || "/placeholder.svg"}
//             alt={title}
//             width={40}
//             height={40}
//             className="w-16 h-16 object-contain"
//           />
//         </div>
//         <div className="space-y-3">
//           {stats.map((stat, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
//               transition={{ duration: 0.3, delay: index * 0.05 }}
//               className="flex justify-between items-center"
//             >
//               <span className="text-sm text-black">{stat.label}</span>
//               <span className="text-sm font-medium text-black">{stat.value}</span>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </Card>
//   )
// }


import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";




const floatCss = `
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-12px); }
}
@keyframes float-reverse {
  0%, 100% { transform: translateY(-12px) ; }
  50%      { transform: translateY(0) ; }
}
.animate-float        { animation: float        4s ease-in-out infinite; }
.animate-float-reverse{ animation: float-reverse 4s ease-in-out infinite; }
`;

export function StatCard({ icon, title, subtitle, stats, index, redirectUrl }) {
  const [isHovered, setIsHovered] = useState(false);

  // decide which CSS class to apply
  const imgAnimClass = index % 2 === 0 ? "animate-float" : "animate-float-reverse";

  return (
    <>
      {/* inject the keyframes only once */}
      <style dangerouslySetInnerHTML={{ __html: floatCss }} />

      <Card
        className="relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow h-52  cursor-pointer bg-blue-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* ---------- ORIGINAL CONTENT (always visible) ---------- */}
        <div className="relative w-full h-full p-6 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            {/* Animated image – pure CSS, direction depends on index */}
            <img
              src={icon || "/CorporationLogo1_1670.png"}
              alt={title}
              className={`w-20 h-20 object-contain ${imgAnimClass}`}
            />

            <div className="text-center">
              <div className="text-lg font-semibold bg-linear-to-r from-blue-900 to-blue-400 bg-clip-text text-transparent">
                {title}
              </div>
              {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
            </div>
          </div>
        </div>

        {/* ---------- HOVER OVERLAY (covers everything) ---------- */}
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: isHovered ? 0 : "100%" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="absolute inset-0 bg-black/10 backdrop-blur-sm p-2 flex flex-col justify-end"
        >
          <div className="flex justify-center mb-3">
            <img
              src={icon || "/placeholder.svg"}
              alt={title}
              className="w-16 h-16 object-contain opacity-80"
            />
          </div>

          <div className="space-y-2">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex justify-between text-black"
              >
                <span className="text-sm">{stat.label}</span>
                <span className="text-sm font-medium">{stat.value}</span>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center items-center p-1 font-bold bg-linear-to-r from-blue-900 to-blue-400 bg-clip-text text-transparent">
            <a href={redirectUrl} >Explore...</a>
          </div>
        </motion.div>
      </Card>
    </>
  );
}