// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        'nuxt-vuefire'
    ],
    vuefire: {
        config: {
            apiKey: "AIzaSyAK--Z4lxONOZSbLgOx_3jdaoKTW0uLAe8",
            authDomain: "mycure-blog-bc469.firebaseapp.com",
            projectId: "mycure-blog-bc469",
            storageBucket: "mycure-blog-bc469.appspot.com",
            messagingSenderId: "45717185653",
            appId: "1:45717185653:web:3805db168a9df3b00bc43c"
        },
        admin: {
            serviceAccount: 'service-account.json'
        },
        auth: true
    },
    css: [
        '@/assets/styles.css'
    ],
    ssr: false
})
