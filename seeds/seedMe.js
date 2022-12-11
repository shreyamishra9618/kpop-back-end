const sequelize = require('../config/connection');
const { User, Blog, Questions, Quiz } = require("../models")
const seedMe = async () => {
    await sequelize.sync({ force: true })
    const users = [
        {
            email: "shreya@gmail.com",
            username: "Shreya",
            password: "password23",
            picture: "logo512.png"
        },
        {
            email: "silvia@gmail.com",
            usernamme: "Silvia",
            password: "password13",
            picture: "logo512.png"
        },
        {
            email: "mo@gmail.com",
            username: "MO",
            password: "password23",
            picture: "logo512.png"
        },
        {
            email: "michelle@gmail.com",
            username: "Michelle",
            password: "password33",
            picture: "logo512.png"
        }
    ]
    const blogs = [
        {
            title: "K-Pop History",
            description: "The first K-pop album was released in 1925. The album is called “Yo Pungjin Sewol” (or “This Tumultuous Time”) and is by artists Park Chae-seon and Lee Ryu-saek. However, K-pop’s modern-day iteration began in 1992 with the emergence of Seo Taiji and Boys. Seo has since earned the nickname President of Culture.",
            picture: "https://i.pinimg.com/originals/b7/72/8c/b7728c6882401f9d61695317b2be2b7b.jpg",
            user_id: 1,
            username: "Shreya"
        },
        {
            title: "Fun Facts",
            description: `Over 100 groups debut in South Korea annually. However, less than 5% of these bands are successful.
            BTS was the first K-pop act to perform as a musical guest Saturday Night Live. In April of 2019, the group performed songs from its newly released album “Map of the Soul: Persona.”
            The name “BTS,” stands for the words, “Bangtan Sonyeonda” in Korean. This translates to mean “Bulletproof Boy Scouts.”
            The Kim Sisters were the first Korean group to release an album in the United States.
            They produced the album in 1959 in Las Vegas, where they later held many concerts. Their cover of “Charlie Brown” reached No. 7 on the Billboard singles chart.`,
            picture: "https://wallpapercave.com/wp/wp6762437.jpg",
            user_id: 2,
            username: "Silvia"
        },
        {
            title: "Cuz Fan's are Special!!",
            description: 'There are special taxi services in South Korea to help fans follow their favorite K-pop idols. The so-called “sasaeng taxi” is a method used by rabid fans to follow idols to their scheduled activities or personal appointments. These taxis charge $600 a day (on average), and will follow an idol or group for the entire day.',
            picture: "https://i.pinimg.com/originals/2e/0b/4a/2e0b4aaed465130cf765f2cf2a0ca3fb.jpg",
            user_id: 3,
            username: "MO"
        },
        {
            title: "Bora the Star!!",
            description: "Bora, from the South Korean girl group SISTAR, lost her father the day she had her TV debut. She received the news that her dad had lost his battle with gastric cancer the very same day she auditioned for JYP Entertainment.",
            picture: "https://c4.wallpaperflare.com/wallpaper/923/540/986/k-pop-asian-yoon-bora-starship-entertainment-wallpaper-preview.jpg",
            user_id: 4,
            username: "Michelle"
        },

    ]
    try{

        await User.bulkCreate(users, {
            individualHooks: true
        })
        await Blog.bulkCreate(blogs)
        await Quiz.bulkCreate(quiz)
        await Questions.bulkCreate(questions)
    } catch (err) {
        throw err
    }
    process.exit(0);
}

module.exports = seedMe();