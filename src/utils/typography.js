import Typography from "typography"

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.666,
  headerFontFamily: [
    "Lato"
  ],
  bodyFontFamily: ["Lato"],
  googleFonts: [
    {
      name: 'Lato',
      styles: [
        '300',
        '400',
        '400i',
        '700',
        '700i',
      ],
    },
  ],
})

export default typography