export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    jwt:{
        secretorprivatekey: process.env.SECRETORKEY,
    },
    db: {
        remote_db_url: process.env.REMOTE_DB_URL,
        remote_db_username: process.env.REMOTE_DB_USERNAME,
        remote_db_password: process.env.REMOTE_DB_PASSWORD,
        local_db_url: process.env.LOCAL_DB_URL
    }
})