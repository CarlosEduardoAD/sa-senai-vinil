import { useState } from 'react';

function HeroHome(){
    const [open, setOpen] = useState(false);

    const openDrawer = () => {
        setOpen(true);
    }
    return(
        <section className="relative">
        </section>
    )
}

export default HeroHome;
