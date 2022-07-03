// module.exports = {
//     HOST: 'localhost',
//     USER: 'postgres',
//     PASSWORD: 'root',
//     DB: 'testdb',
//     dialect: 'postgres',
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// }
module.exports = {
    HOST: 'ec2-44-195-162-77.compute-1.amazonaws.com',
    USER: 'srfhkukgjhckhl',
    PASSWORD: '5ee52b0f6a75f7c445e9c5ea009d233eb090948b0003d281cef116f78f333737',
    DB: 'denreqm0425nca',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
