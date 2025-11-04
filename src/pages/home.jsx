// import { useMemo, useState, useEffect, useContext } from "react";
// import { StatCard } from "@/components/stat-card";
// import { motion } from "framer-motion";
// import { UlbContext } from '../context/UlbContex.jsx';

// // // Dashboard config with icons added
// const DASH_CODES = {
//   PTAX: { title: "Property Tax", subtitle: "(Amounts in Cr)", labels: ["Total Demand", "Total Collection", "Recovery Percent"], formats: ["cr", "cr", "percent"], icon: "./Property_Tax.png", redirectUrl: "https://property.nagarkaryavalinewuat.com/" },
//   MRKT: { title: "Market", labels: ["Total Application", "Issued Certificate", "Total Amount"], formats: ["int", "int", "money"], icon: "./Market.jpg", redirectUrl: "https://market.nagarkaryavalinewuat.com/" },
//   ESTD: { title: "Estate", labels: ["Total Properties", "Total Demand", "Collected Amount"], formats: ["int", "money", "money"], icon: "./Estate.png", redirectUrl: "https://estate.nagarkaryavalinewuat.com/" },
//   MRRG: { title: "Marriage", labels: ["Total Application", "Certificate Issued", "Total Collection"], formats: ["int", "int", "money"], icon: "./Marriage.png", redirectUrl: "https://marriage.nagarkaryavalinewuat.com/" },
//   BAND: { title: "Birth and Death", labels: ["Total Application", "Issued Certificate", "Total Amount"], formats: ["int", "int", "money"], icon: "./Birth_Death.png", redirectUrl: "https://birthdeath.nagarkaryavalinewuat.com/" },
//   CFC: { title: "CFC", subtitle: "(Amounts in Cr)", labels: ["Total Demand", "Total Collection", "Recovery Percent"], formats: ["cr", "cr", "percent"], icon: "./CFC.png", redirectUrl: "https://cfc.nagarkaryavalinewuat.com/" },
//   RTS: { title: "Right to Service", labels: ["Total Application", "Issued Services Provider", "Total Collection"], formats: ["int", "int", "money"], icon: "./RTS.png", redirectUrl: "https://rts.nagarkaryavalinewuat.com/" },
//   FIRE: { title: "Fire Department", labels: ["Total Application", "Issued Certificate", "Total Amount"], formats: ["int", "int", "money"], icon: "./Fire.png", redirectUrl: "https://fire.nagarkaryavalinewuat.com/" },
//   WAT: { title: "Water Tax", labels: ["Total Demand", "Total Collection", "Recovery Percent"], formats: ["money", "money", "percent"], icon: "./Water.png", redirectUrl: "https://water.nagarkaryavalinewuat.com/" },
//   INW: { title: "Inward Outward", labels: ["Total", "Total Inward", "Total Outward"], formats: ["int", "int", "int"], icon: "./inwaordoutward.png", redirectUrl: "https://inward.nagarkaryavalinewuat.com/" },
//   CRMD: { title: "Grievances", labels: ["Total Complaints", "Resolved Complaints", "Pending Complaints"], formats: ["int", "int", "int"], icon: "./grivances.jpeg", redirectUrl: "https://crm.nagarkaryavalinewuat.com/" },
//   LEGL: { title: "Legal", labels: ["No of Cases", "Cases in Progress", "Completed Cases"], formats: ["int", "int", "int"], icon: "./Legal.jpg", redirectUrl: "https://legal.nagarkaryavalinewuat.com/" },
// };


// // Format helper
// const getFormattedValue = (value, type) => {


//   if (!Number.isFinite(value)) return "-";
//   const v = Number(value);

//   switch (type) {
//     case "money": return v.toLocaleString("en-IN");
//     case "cr": return v.toFixed(2).replace(/\.00$/, "");
//     case "percent": return v.toFixed(2).replace(/\.00$/, "") + "%";
//     default: return v;
//   }
// };

// // Convert compact API string -> object
// const parseCompactString = (str = "") =>
//   str.split("#").reduce((acc, block) => {
//     if (!block) return acc;
//     const [code, ...nums] = block.split("$");
//     acc[code] = nums.map(n => (n === "" ? 0 : Number(n)));
//     return acc;
//   }, {});

// export default function Home() {
//   const [compactString, setCompactString] = useState("");
//   const { ulbID } = useContext(UlbContext);


// useEffect(() => {
//   if (!ulbID) return;

//   const fetchData = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/dashboard?ulbId=${ulbID}`);
//       const data = await res.json();
//       console.log("API returned:", data);
//       setCompactString(data.data);
//     } catch (err) {
//       console.error("Failed fetching dashboard:", err);
//     }
//   };

//   fetchData();
// }, [ulbID]);


//  useEffect(() => {
//   console.log("compactString updated:", compactString);
// }, [compactString]);



//   const cardsData = useMemo(() => {
//     const data = parseCompactString(compactString);
//     const fallbackIcon = "./Property_Tax";

//     return Object.entries(DASH_CODES).map(([code, cfg]) => {
//       const values = data[code] || [];
//       const stats = cfg.labels.map((label, i) => ({
//         label,
//         value: getFormattedValue(values[i], cfg.formats[i])
//       }));

//       return { 
//         icon: cfg.icon || fallbackIcon, // ✅ use icon if exists else fallback
//         title: cfg.title, 
//         subtitle: cfg.subtitle, 
//         stats ,
//         redirectUrl: cfg.redirectUrl || "#",
//       };
//     });
//   }, [compactString]);

//   return (
//     <main className="min-h-screen premium-gradient">
//       <div className="md:max-w-7xl mx-auto p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {cardsData.map((card, idx) => (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <StatCard {...card} index={idx}/>
//           </motion.div>
//         ))}
//       </div>
//     </main>
//   );
// }




import { useMemo, useState, useEffect, useContext } from "react";
import { StatCard } from "@/components/stat-card";
import { motion } from "framer-motion";
import { UlbContext } from "../context/UlbContex.jsx";

const DASH_CODES = {
  // ADMN: {
  //   title: "Admin",
  //   apiName: "ADMIN DEPARTMENT",
  //   labels: ["Total Applications", "Processed", "Pending"],
  //   formats: ["int", "int", "int"],
  //   icon: "./Admin.png",
  //   redirectUrl: "https://admin.nagarkaryavalinewuat.com/"
  // },
  // ADVT: {
  //   title: "Advertisement",
  //   apiName: "ADVERTISEMENT DEPARTMENT",
  //   labels: ["Total Applications", "Approved", "Total Revenue"],
  //   formats: ["int", "int", "money"],
  //   icon: "./Advertisement.png",
  //   redirectUrl: "https://advertisement.nagarkaryavalinewuat.com/"
  // },
  // ACC: {
  //   title: "Accounts",
  //   apiName: "Accounts Department.",
  //   labels: ["Total Bills", "Approved", "Pending"],
  //   formats: ["int", "int", "int"],
  //   icon: "./Accounts.png",
  //   redirectUrl: "https://accounts.nagarkaryavalinewuat.com/"
  // },
  ESTD: {
    title: "Estate",
    apiName: "Asset Management Division",
    labels: ["Total Properties", "Total Demand", "Collected Amount"],
    formats: ["int", "money", "money"],
    icon: "./Estate.png",
    redirectUrl: "https://estate.nagarkaryavalinewuat.com/"
  },
  BAND: {
    title: "Birth and Death",
    apiName: "Birth & Death Department.",
    labels: ["Total Application", "Issued Certificate", "Total Amount"],
    formats: ["int", "int", "money"],
    icon: "./Birth_Death.png",
    redirectUrl: "https://birthdeath.nagarkaryavalinewuat.com/"
  },
  FIRE: {
    title: "Fire Department",
    apiName: "Fire Brigade Department",
    labels: ["Total Application", "Issued Certificate", "Total Amount"],
    formats: ["int", "int", "money"],
    icon: "./Fire.png",
    redirectUrl: "https://fire.nagarkaryavalinewuat.com/"
  },
  MRKT: {
    title: "Market",
    apiName: "MARKET DEPARTMENT",
    labels: ["Total Application", "Issued Certificate", "Total Amount"],
    formats: ["int", "int", "money"],
    icon: "./Market.jpg",
    redirectUrl: "https://market.nagarkaryavalinewuat.com/"
  },
  MRRG: {
    title: "Marriage",
    apiName: "Marriage Registration",
    labels: ["Total Application", "Certificate Issued", "Total Collection"],
    formats: ["int", "int", "money"],
    icon: "./Marriage.png",
    redirectUrl: "https://marriage.nagarkaryavalinewuat.com/"
  },
  // PAYR: {
  //   title: "Payroll",
  //   apiName: "PAYROLL DEPARTMENT",
  //   labels: ["Total Employees", "Total Salary Paid", "Pending Payments"],
  //   formats: ["int", "money", "money"],
  //   icon: "./Payroll.png",
  //   redirectUrl: "https://payroll.nagarkaryavalinewuat.com/"
  // },
  PTAX: {
    title: "Property Tax",
    apiName: "Property Tax",
    labels: ["Total Demand", "Total Collection", "Recovery Percent"],
    formats: ["cr", "cr", "percent"],
    icon: "./Property_Tax.png",
    redirectUrl: "https://property.nagarkaryavalinewuat.com/"
  },
  // SWM: {
  //   title: "Solid Waste Management",
  //   apiName: "Solid Waste Management",
  //   labels: ["Total Households", "Collected Waste", "Total Revenue"],
  //   formats: ["int", "int", "money"],
  //   icon: "./SolidWaste.png",
  //   redirectUrl: "https://solidwaste.nagarkaryavalinewuat.com/"
  // }
};

// format helpers
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

const parseCompactString = (str = "") =>
  str.split("#").reduce((acc, block) => {
    if (!block) return acc;
    const [code, ...nums] = block.split("$");
    acc[code] = nums.map(n => (n === "" ? 0 : Number(n)));
    return acc;
  }, {});

export default function Home() {
  const [compactString, setCompactString] = useState("");
  const [allowedDepartments, setAllowedDepartments] = useState([]);
  const { ulbID } = useContext(UlbContext);

  // 1️⃣ Fetch allowed departments for selected ULB
  useEffect(() => {
    if (!ulbID) return;
    const fetchDepartments = async () => {
      try {
        const res = await fetch("http://localhost:5000/DeptByCor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ulb_id: ulbID }),
        });
        const data = await res.json();
        console.log("Allowed departments:", data.data);
        setAllowedDepartments(data.data.map(d => d.DEPARTMENTNAME.toUpperCase()));
      } catch (err) {
        console.error("Failed to fetch departments:", err);
      }
    };
    fetchDepartments();
  }, [ulbID]);

  // 2️⃣ Fetch dashboard data
  useEffect(() => {
    if (!ulbID) return;
    const fetchDashboard = async () => {
      try {
        const res = await fetch(`http://localhost:5000/dashboard?ulbId=${ulbID}`);
        const data = await res.json();
        console.log("Dashboard API returned:", data);
        setCompactString(data.data);
      } catch (err) {
        console.error("Failed fetching dashboard:", err);
      }
    };
    fetchDashboard();
    const interval = setInterval(fetchDashboard, 10000);
    return () => clearInterval(interval);
  }, [ulbID]);

  // 3️⃣ Filter cards by allowed departments
  const cardsData = useMemo(() => {
    const data = parseCompactString(compactString);
    const fallbackIcon = "/CorporationLogo1_1670.png";

    const filteredEntries = Object.entries(DASH_CODES).filter(([_, cfg]) =>
      allowedDepartments.includes(cfg.apiName.toUpperCase())
    );

    return filteredEntries.map(([code, cfg]) => {
      const values = data[code] || [];
      const stats = cfg.labels.map((label, i) => ({
        label,
        value: getFormattedValue(values[i], cfg.formats[i]),
      }));

      return {
        icon: cfg.icon || fallbackIcon,
        title: cfg.title,
        subtitle: cfg.subtitle,
        stats,
        redirectUrl: cfg.redirectUrl || "#",
      };
    });
  }, [compactString, allowedDepartments]);

  return (
    <main className="min-h-screen premium-gradient">
      <div className="md:max-w-7xl mx-auto p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardsData.length === 0 ? (
          <div className="text-center col-span-full text-gray-500 mt-10">
            No departments available for this ULB.
          </div>
        ) : (
          cardsData.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <StatCard {...card} index={idx} />
            </motion.div>
          ))
        )}
      </div>
    </main>
  );
}


