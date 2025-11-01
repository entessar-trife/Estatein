import type { CommonCardProps } from "../types/CommonCard";
import home from "../assets/icons/CardUnderHero/home.svg"
import unlock from "../assets/icons/CardUnderHero/unlock.svg"
import effortless from "../assets/icons/CardUnderHero/effortless.svg"
import smart from "../assets/icons/CardUnderHero/smart.svg"


export const SiteFeaturesServicesData: CommonCardProps[] = [
    {
        cardTitle: "Find Your Dream Home",
        cardImg: home,
        HeadingTag: "link",
        titleLink: "/properties"
    },
    {
        cardTitle: "Unlock Property Value",
        cardImg:unlock,
        HeadingTag: "a",
        titleLink: "/services#property"
    },
    {
        cardTitle: "Effortless Property Management",
        cardImg: effortless,
        HeadingTag: "a",
        titleLink: "/services#management"
    },
    {
        cardTitle: "Smart Investments, Informed Decisions",
        cardImg: smart,
        HeadingTag: "a",
        titleLink: "/services#investments"
    },
]

export const SiteFeaturesHomeData: CommonCardProps[] = [
    {
        cardTitle: "Find Your Dream Home",
        cardImg: home,
        HeadingTag: "link",
        titleLink: "/properties"
    },
    {
        cardTitle: "Unlock Property Value",
        cardImg: unlock,
        HeadingTag: "link",
        titleLink: "/services#property"
    },
    {
        cardTitle: "Effortless Property Management",
        cardImg: effortless,
        HeadingTag: "link",
        titleLink: "/services#management"
    },
    {
        cardTitle: "Smart Investments, Informed Decisions",
        HeadingTag: "link",
        cardImg: smart,
        titleLink: "/services#investments"
    },
]