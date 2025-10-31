import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Dropdown from "./dropdown";
import { UlbContext } from "../context/UlbContex.jsx";
import { DEFAULT_ULB_ID } from '../types/constatnts.js';

const API_BASE_URL = "http://localhost:5000";

const ULB_META_BY_ID = {
  [DEFAULT_ULB_ID]: { title: "Select ULB", logo: "./CorporationLogo1_1670.png" },
  // example static mapping for a few known ids (optional)
  "4": { title: "Amravati Municipal Corporation", logo: "/images/amravati.png" },
  "5": { title: "धुळे महानगरपालिका, धुळे", logo: "./CorporationLogo1_1670.png" },
  fallback: { title: "ULB", logo: "./CorporationLogo1_1670.png" },
};

export default function Navbar() {
  const { ulbID, setUlbID, corporationOptions, setCorporationOptions } = useContext(UlbContext);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    if (Array.isArray(corporationOptions) && corporationOptions.length > 0) return; // already loaded

    const url = `${API_BASE_URL.replace(/\/$/, "")}/CorporationDropdown`;
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        if (!mounted) return;
        const rows = Array.isArray(res?.data?.data) ? res.data.data : [];

        const options = rows.map((corp) => {
          // tolerate different casing
          const id = corp.CORPID ?? corp.CorpId ?? corp.CORP_ID ?? corp.num_corporation_id ?? corp.CORPID;
          const name = corp.CORPNAME ?? corp.Corpname ?? corp.var_corporation_name ?? corp.CorpName;
          return {
            value: String(id ?? ""),
            label: String(name ?? id ?? "Unknown"),
            path: "/", 
            // optionally include logo if server returns it
            logo: corp.logoUrl ?? null,
          };
        });

        setCorporationOptions(options);
        // console.log("Loaded corporationOptions:", options.length);
      } catch (err) {
        console.error("Error fetching CorporationDropdown:", err?.response?.status, err?.message || err);
        if (mounted) setCorporationOptions([]);
      }
    };

    fetchData();
    return () => { mounted = false; };
    // cleanup function of the useEffect,Stop state updates if unmounted (cleanup)
  }, []);

  // Keep context ulbID in sync with URL query param on mount / route change
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const idFromUrl = params.get("ulbId") || params.get("ulb");
    if (idFromUrl && idFromUrl !== ulbID) {
      setUlbID(String(idFromUrl));
    }
  }, [location.search]);


  const staticMeta = ULB_META_BY_ID[ulbID];
  const optionMeta = (corporationOptions || []).find((o) => String(o.value) === String(ulbID));
  const meta = staticMeta || (optionMeta ? { title: optionMeta.label, logo: optionMeta.logo || "./CorporationLogo1_1670.png" } : ULB_META_BY_ID.fallback);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="backdrop-blur-md sticky top-0 z-50 shadow-xl "
    >
      <div className="flex-col items-center justify-center py-4 px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          <motion.img
            key={meta.logo} // animate switch when logo changes
            src={meta.logo}
            alt={meta.title}
            className="h-10 w-10 md:h-16 md:w-24 object-contain rounded"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.25 }}
          />
          <motion.h1
            key={meta.title}
            className="text-lg md:text-2xl font-semibold text-gray-800"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {meta.title}
          </motion.h1>
           <motion.img
            
            src='./logo31.png'
            alt={meta.title}
            className="h-10 w-10 md:h-16 md:w-24 object-contain rounded"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.25 }}
          />
        </div>
               <motion.hr className="border-black/10 max-w-7xl mx-auto my-2" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.2 }} />

        <div className="flex items-center justify-center gap-4">
          <div className="hidden md:block text-sm text-gray-600">Welcome</div>
          <div className="border border-gray-200 rounded-2xl hover:border-gray-300 transition-colors duration-200">
            <Dropdown />
          </div>
        </div>
      </div>

      {/* <motion.hr className="border-black/10 max-w-7xl mx-auto" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.2 }} /> */}
    </motion.nav>
  );
}