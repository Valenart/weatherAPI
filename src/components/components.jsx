import { Typography } from "@mui/material";
import './components.css';

export default function Text({ children, variant = 'h5', colorText = '#fff', fontWeight = 400, fontSize, sx = {}, ...rest }) {
    return (
        <Typography
            variant={variant}
            id="text"
            sx={{ color: colorText, fontWeight: fontWeight, fontSize: fontSize, ...sx }}
            {...rest}
        >
            {children}
        </Typography>
    )
}