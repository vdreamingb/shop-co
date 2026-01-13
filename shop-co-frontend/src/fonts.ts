import localFont from "next/font/local"

export const satoshi = localFont({
    src: [
        {
            path: "../public/fonts/satoshi/Satoshi-Regular.otf",
            weight: "400",
            style: "normal"
        },
        {
            path: "../public/fonts/satoshi/Satoshi-Medium.otf",
            weight: "500",
            style: "normal"
        },
        {
            path: "../public/fonts/satoshi/Satoshi-Bold.otf",
            weight: "700",
            style: "normal"
        },
    ],
    variable: "--font-satoshi",
    display: "swap"
})

export const integralCF = localFont({
    src: [
        {
            path: "../public/fonts/Integral_CF_Font/Demo_Fonts/Fontspring-DEMO-integralcf-regular.otf",
            weight: "400",
            style: "normal"
        },
        {
            path: "../public/fonts/Integral_CF_Font/Demo_Fonts/Fontspring-DEMO-integralcf-medium.otf",
            weight: "500",
            style: "normal"
        },
        {
            path: "../public/fonts/Integral_CF_Font/Demo_Fonts/Fontspring-DEMO-integralcf-bold.otf",
            weight: "700",
            style: "normal"
        }
    ],
    variable: "--font-integral-cf",
    display: "swap"
})