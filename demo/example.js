const { RoundRobinRedisPool, RedisPromise, SnowFlakeCombiner, IdGenerator, YmdNumberCombiner, YmdhNumberCombiner, } = require('../dist/index');

let redises = new RoundRobinRedisPool([new RedisPromise()]);
let combiner = new SnowFlakeCombiner(new Date(2006, 0, 1, 0, 0, 0).getTime());

(async () => {
let idGenerator = new IdGenerator(redises, combiner);
console.time('id-generator');
let ids = await idGenerator.generateIdBatch(10)
console.timeEnd('id-generator');
ids.forEach(id => console.log(id.toString()));


idGenerator = new IdGenerator(redises, new YmdhNumberCombiner());
console.time('id-generator-ymdh');
ids = await idGenerator.generateIdBatch(10);
console.timeEnd('id-generator-ymdh');
ids.forEach(id => console.log(id.toString()));


idGenerator = new IdGenerator(redises, new YmdNumberCombiner());
console.time('id-generator-ymd');
ids = await idGenerator.generateIdBatch(10)
console.timeEnd('id-generator-ymd');
ids.forEach(id => console.log(id.toString()));


redises.end();
})()