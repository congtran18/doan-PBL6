import React from 'react'
import useSettings from 'app/hooks/useSettings'

const AdminLogo = ({ className }) => {
    const { settings } = useSettings()
    const theme = settings.themes[settings.activeTheme]

    return (
        <svg
            width="60px"
            height="70px"
            className={className}
            viewBox="0 0 240 239"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
        <image href="https://cf.shopee.vn/file/629926f67ec6d41567c74ca3b948230e" x="0" y="0"/>
        </svg>
    )
}

export default AdminLogo
