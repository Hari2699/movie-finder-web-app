const images = [
    'https://image.freepik.com/free-vector/set-geometric-neon-empty-frame-banners-set_1017-25562.jpg',
    'https://img.freepik.com/free-vector/set-colorful-neon-circle-glowing-frames_1017-25569.jpg?size=338&ext=jpg',
    'https://image.freepik.com/free-vector/classic-retro-80s-style-tropical-sunset-with-palm-tree_1017-31136.jpg',
    'https://image.freepik.com/free-vector/neon-star-empty-frame-background_1017-19928.jpg',
    'https://image.freepik.com/free-vector/man-skateboarding-future-metropolis-vector_1441-3381.jpg',
    'https://image.freepik.com/free-photo/80s-retro-futuristic-sci-fi-retrowave-vj-videogame-landscape-neon-lights-stylized-vintage-vaporwave_250994-2761.jpg',
    'https://image.freepik.com/free-vector/blue-3d-abstract-wave-pattern-background_53876-97987.jpg',
    'https://image.freepik.com/free-photo/month-gold-particle-black-background-3d-rendering-3d-illustration_158469-2657.jpg',
    'https://img.freepik.com/free-photo/unusual-beautiful-golden-form-3d-illustration-rendering_158469-3009.jpg?size=338&ext=jpg',
    'https://img.freepik.com/free-photo/beautiful-black-background-with-golden-glitter-3d-illustration-3d-rendering_158469-3097.jpg?size=338&ext=jpg',
    'https://image.freepik.com/free-vector/retro-futuristic-synthwave-retrowave-styled-night-cityscape-with-sunset-background_148087-120.jpg',
    'https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGF3bnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    'https://wallpaperaccess.com/full/138728.jpg',
    'https://i.pinimg.com/originals/9e/26/1d/9e261d6c0f17df2660219a68140a9c6c.jpg',
    'https://c4.wallpaperflare.com/wallpaper/145/198/400/tree-4k-full-hd-desktop-download-wallpaper-preview.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3ST3l3ZnzLBGY4nhr3m3dyYSlxeXp7AILHFKpiwL7MPfKqtYSbVykRs8jFCpmvd6grp4&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREKT4w6UGxFnaHKcaRQAYpN3TSSUpafkzvLw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRTOka7yiD9kwnZGsEZR6-w40z2R9obqb8-g&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo7_CZAwJmtxIYrwsccEi1QasNNwjeEDJ6bQ&usqp=CAU'
]

const getRandomImage = () => {
    const index = Math.floor(Math.random() * images.length)
    return images[index]
}

export default getRandomImage