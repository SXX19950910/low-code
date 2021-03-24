export function parseStyles(styles, props) {
  const {
    marginTop,
    marginLeft,
    marginBottom,
    marginRight,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    display,
    flexDirection,
    alignItems,
    justifyContent,
    flexWrap,
    fontSize,
    fontWeight,
    lineHeight,
    color,
    textAlign,
    opacity,
    position,
    top,
    bottom,
    left,
    right,
    zIndex,
    clear,
    backgroundColor,
    backgroundImage,
    backgroundSize,
    backgroundPosition,
    backgroundRepeat,
    backgroundPositionX,
    backgroundPositionY,
    borderRadius,
    borderWidth,
    borderStyle,
    borderColor,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    boxShadowColor,
    boxShadowX,
    boxShadowY,
    boxShadowBlur,
    boxShadowExtend,
    width,
    height
  } = styles
  const { backgroundType = '', borderRadiusType, borderType, boxShadowType } = props
  const result = {
    marginTop: isNaN(marginTop) ? marginTop : `${marginTop}px`,
    marginBottom: isNaN(marginBottom) ? marginBottom : `${marginBottom}px`,
    marginLeft: isNaN(marginLeft) ? marginLeft : `${marginLeft}px`,
    marginRight: isNaN(marginRight) ? marginRight : `${marginRight}px`,
    paddingTop: `${paddingTop}px`,
    paddingBottom: `${paddingBottom}px`,
    paddingLeft: `${paddingLeft}px`,
    paddingRight: `${paddingRight}px`,
    display,
    flexDirection,
    alignItems,
    justifyContent,
    flexWrap,
    fontSize: `${fontSize}px`,
    opacity: opacity ? opacity / 100 : '',
    fontWeight,
    lineHeight,
    color,
    textAlign,
    position,
    top: `${top}px`,
    bottom: `${bottom}px`,
    left: `${left}px`,
    right: `${right}px`,
    zIndex,
    clear,
    backgroundSize,
    backgroundPosition,
    backgroundRepeat,
    backgroundPositionX,
    backgroundPositionY,
    width,
    height
  }
  const boxShadow = `${boxShadowColor} ${boxShadowX}px ${boxShadowY}px ${boxShadowBlur}px ${boxShadowExtend}px ${boxShadowType === 'inset' ? 'inset' : ''}`
  if (backgroundType === 'color') result.backgroundColor = backgroundColor
  else if (backgroundType === 'img') result.backgroundImage = `url(${backgroundImage})`
  if (borderType) result[borderType] = `${borderWidth}px ${borderStyle} ${borderColor}`
  if (borderRadiusType === 'custom') {
    result.borderTopLeftRadius = `${borderTopLeftRadius}px`
    result.borderTopRightRadius = `${borderTopRightRadius}px`
    result.borderBottomRightRadius = `${borderBottomRightRadius}px`
    result.borderBottomLeftRadius = `${borderBottomLeftRadius}px`
  } else if (borderRadiusType === 'fixed') {
    result.borderRadius = `${borderRadius}px`
  }
  if (boxShadowType) {
    result.boxShadow = boxShadow
  }
  return result
}
