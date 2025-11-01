import type { CommonCardProps } from "../types/CommonCard";
import market from "../assets/icons/SmartInvestments/market.svg"
import roi from "../assets/icons/SmartInvestments/roi.svg"
import strategies from "../assets/icons/SmartInvestments/strategies.svg"
import diversification from "../assets/icons/SmartInvestments/diversification.svg"

export const investmentsData: CommonCardProps[] = [
    {
        cardImg: market,
        cardTitle: "Market Insight",
        cardDesc: "Stay ahead of market trends with our expert Market Analysis. We provide in-depth insights into real estate market conditions"
    },
    {
        cardImg: roi,
        cardTitle: "ROI Assessment",
        cardDesc: "Make investment decisions with confidence. Our ROI Assessment services evaluate the potential returns on your investments"
    },
    {
        cardImg: strategies,
        cardTitle: "Customized Strategies",
        cardDesc: "Every investor is unique, and so are their goals. We develop Customized Investment Strategies tailored to your specific needs"
    },
    {
        cardImg: diversification,
        cardTitle: "Diversification Mastery",
        cardDesc: "Diversify your real estate portfolio effectively. Our experts guide you in spreading your investments across various property types and locations"
    }
]