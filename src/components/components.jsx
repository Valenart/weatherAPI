import { Typography } from "@mui/material";
import './components.css';

export default function Text({ children, variant = 'h5', colorText = '#fff', fontWeight = 400, fontSize, rest }) {

    return (
        <Typography variant={variant} id="text" sx={{ color: colorText, fontWeight: fontWeight, fontSize: `calc('${fontSize}' + 10%)`, ...rest }}>
            {children}
        </Typography>
    )
}