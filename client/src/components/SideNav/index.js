import React from 'react';

function SideNav() {

    const categories = [
        {
            name: 'T-Shirt (short)',
            descripion: 'short sleeve t'
        },
        {
            name: 'T-Shirt (long sleeve)',
            descripion: 'long sleeve t'
        },
        {
            name: 'Hoodie',
            descripion: 'hoodies and sweatshirts'
        },
        {
            name: 'Crewneck',
            descripion: 'crew necks'
        },
        {
            name: 'Tank top',
            descripion: 'sleeveless'
        },
        {
            name: 'Womens',
            descripion: 'womens tops'
        },
        {
            name: 'Dress shirts',
            descripion: 'dress shirts and button ups'
        },
        {
            name: 'Sweaters',
            descripion: 'sweaters'
        },
        {
            name: 'Coats/Jackets',
            descripion: 'coats, jackets, and pullovers'
        },
        {
            name: 'Flannel',
            descripion: 'long sleeve flannels'
        },
        {
            name: 'Polo',
            descripion: 'polo shirts'
        }
    ];

    return (
        <section>
            <h2>
                Categories
            </h2>

            <nav>
                <ul>
                    <li>
                        <span>T shirt (short)</span>
                    </li>
                    {categories.map((category) => (

                        <li
                            className="mx-1"
                            key={category.name} >
                            <a href="/">

                                <span>
                                    {category.name}
                                </span>
                            </a>
                        </li>

                    ))}

                </ul>
            </nav>

        </section>
    )
}

export default SideNav;