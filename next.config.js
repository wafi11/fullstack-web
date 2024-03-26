/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        remotePatterns: [
            {

                hostname : "avatars.githubusercontent.com",
            },{
                hostname : "lh3.googleusercontent.com"
            }
            ,{
                hostname : "res.cloudinary.com"
            }
        ]
    }
}

module.exports = nextConfig
