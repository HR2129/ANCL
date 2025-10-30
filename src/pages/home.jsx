import { useMemo, useState } from "react";
import { StatCard } from "@/components/stat-card";
import { motion } from "framer-motion";
import { useEffect } from "react";

// Dashboard config
const DASH_CODES = {
  PTAX: { title: "Property Tax", subtitle: "(Amounts in Cr)", labels: ["Total Demand", "Total Collection", "Recovery Percent"], formats: ["cr", "cr", "percent"] },
  MRKT: { title: "Market", labels: ["Total Application", "Issued Certificate", "Total Amount"], formats: ["int", "int", "money"] },
  ESTD: { title: "Estate", labels: ["Total Properties", "Total Demand", "Collected Amount"], formats: ["int", "money", "money"] },
  MRRG: { title: "Marriage", labels: ["Total Application", "Certificate Issued", "Total Collection"], formats: ["int", "int", "money"] },
  BAND: { title: "Birth and Death", labels: ["Total Application", "Issued Certificate", "Total Amount"], formats: ["int", "int", "money"] },
  CFC: { title: "CFC", subtitle: "(Amounts in Cr)", labels: ["Total Demand", "Total Collection", "Recovery Percent"], formats: ["cr", "cr", "percent"] },
  RTS: { title: "Right to Service", labels: ["Total Application", "Issued Services Provider", "Total Collection"], formats: ["int", "int", "money"] },
  FIRE: { title: "Fire Department", labels: ["Total Application", "Issued Certificate", "Total Amount"], formats: ["int", "int", "money"] },
  WAT: { title: "Water Tax", labels: ["Total Demand", "Total Collection", "Recovery Percent"], formats: ["money", "money", "percent"] },
  INW: { title: "Inward Outward", labels: ["Total", "Total Inward", "Total Outward"], formats: ["int", "int", "int"] },
  CRMD: { title: "Grievances", labels: ["Total Complaints", "Resolved Complaints", "Pending Complaints"], formats: ["int", "int", "int"] },
  LEGL: { title: "Legal", labels: ["No of Cases", "Cases in Progress", "Completed Cases"], formats: ["int", "int", "int"] },
};

// Format helper
const getFormattedValue = (value, type) => {
  if (!Number.isFinite(value)) return "-";

  const v = Number(value);

  switch (type) {
    case "money": return v.toLocaleString("en-IN");
    case "cr": return v.toFixed(2).replace(/\.00$/, "");
    case "percent": return v.toFixed(2).replace(/\.00$/, "") + "%";
    default: return v;
  }
};

// Convert compact API string -> object
const parseCompactString = (str = "") =>
  str.split("#").reduce((acc, block) => {
    if (!block) return acc;
    const [code, ...nums] = block.split("$");
    acc[code] = nums.map(n => Number(n));
    return acc;
  }, {});

export default function Home() {
  const [compactString, setCompactString] = useState("");

useEffect(() => {
  fetch("http://localhost:5000/api/dashboard?ulbId=4")
    .then(res => res.json())
    .then(data => setCompactString(data.data))
    .catch(err => console.error(err));
}, []);


  const cardsData = useMemo(() => {
    const data = parseCompactString(compactString);
    const defaultIcon = "https://nagarkaryavali.com/ANCL_Dashboard/Images/Property_Tax.png";

    return Object.entries(DASH_CODES).map(([code, cfg]) => {  //[code:RTS/MKT],[cfg:lavel, format,title]
      // console.log("code:", code)
      // console.log("cfg:" ,cfg)
      const values = data[code] || [];  //Example:  [0,0,0] = data["PTAX"]
      // console.log("values",values)
      const stats = cfg.labels.map((label, i) => ({
        label,
        value: getFormattedValue(values[i], cfg.formats[i])
      }));

      return { icon: defaultIcon, title: cfg.title, subtitle: cfg.subtitle, stats };
    });
  }, [compactString]);

  return (
    <main className="min-h-screen premium-gradient">
        <div className="md:max-w-7xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardsData.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <StatCard {...card} />
            </motion.div>
          ))}
        </div>
    </main>
  );
}