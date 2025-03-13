import { IconButton } from "@mui/material"
import ListBullet from 'assets/format_list_bulleted.svg'

interface OptionsBulletProps {
    handleMenuOpen: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const OptionsBullet = ({ handleMenuOpen }: OptionsBulletProps) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        handleMenuOpen(event);
    }

    return (
        <IconButton onClick={handleClick}>
            <img src={ListBullet} width={4} height={16} alt="Options" />
        </IconButton>
    )
}