import localFont from "next/font/local"

export const satoshi = localFont({
    src: [
        {
            path: "../public/satoshi/Satoshi-Regular.otf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/satoshi/Satoshi-Medium.otf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../public/satoshi/Satoshi-Bold.otf",
            weight: "700",
            style: "normal",
        }
    ],
    variable: "--font-satoshi"
})

export const integralCF = localFont({
    src:[
        {
            path: "../public/Integral_CF_Font/Fontspring-DEMO-integralcf-regular.otf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/Integral_CF_Font/Fontspring-DEMO-integralcf-medium.otf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../public/Integral_CF_Font/Fontspring-DEMO-integralcf-bold.otf",
            weight: "700",
            style: "normal",
        }
    ],
    variable: "--font-integralCF"
})