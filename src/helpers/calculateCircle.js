export const calculateCircle = ({ height, width, x, y, ratio }) => {
  const radius = height * (ratio / 2)

  return `
    M 0 0
      L ${width} 0
      L ${width} ${height}
      L 0 ${height}
    Z
    M ${width * x} ${height * y}
      m -${radius} 0
      a ${radius},${radius} 0 1,0 ${radius * 2},0
      a ${radius},${radius} 0 1,0 -${radius * 2},0
    Z
  `
}
