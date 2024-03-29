import React from 'react'
import { NavLink } from 'react-router-dom'

const NavLinkMui = React.forwardRef((props, ref) => <NavLink innerRef={ref} to="" {...props} />)

export default NavLinkMui
