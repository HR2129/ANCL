import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useState } from "react"


export function StatCard({ icon, title, subtitle, stats }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="relative hover:scale-110  duration-700 overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow h-80 cursor-pointer bg-blue-200 "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image and Title Section */}
      <div className="relative w-full h-full p-6 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <img
            src={icon || "/placeholder.svg"}
            alt={title}
            width={60}
            height={60}
            className="w-16 h-16 object-contain"
          />
          <div className="text-center">
            <h3 className="text-lg font-semibold bg-linear-to-r from-blue-900 to-blue-400 bg-clip-text text-transparent">{title}</h3>
            {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: isHovered ? 0 : "100%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute inset-0 bg-black/30  backdrop-blur-sm p-6 flex flex-col justify-end"
      >
        <div className="flex items-center justify-center m-5">
            <img
            src={icon || "/placeholder.svg"}
            alt={title}
            width={40}
            height={40}
            className="w-16 h-16 object-contain"
          />
        </div>
        <div className="space-y-3">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex justify-between items-center"
            >
              <span className="text-sm text-black">{stat.label}</span>
              <span className="text-sm font-medium text-black">{stat.value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Card>
  )
}
