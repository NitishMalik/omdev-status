const mongoose = require('mongoose');
const redis    = require('redis');
const util = require('util');

const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);

client.hget = util.promisify(client.hget);

const exec = mongoose.Query.prototype.exec;


mongoose.Query.prototype.cache = function(options = {}){
    this.useCache = true;    
    this.hashKey = JSON.stringify(options.key || '');

    return this;
}

mongoose.Query.prototype.exec = async function(){
    
    if(!this.useCache){
        return exec.apply(this, arguments);   
    }

    const key = JSON.stringify( Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
    }));
    
    const cachcedValue = await client.hget(this.hashKey, key);

    if(cachcedValue){   
        const doc = JSON.parse(cachcedValue);

        return Array.isArray(doc) ? doc.map(d => new this.model(doc)): new this.model(doc);
        
        doc = new this.model(JSON.parse(cachcedValue));
        return doc;
    }

    const result = await exec.apply(this, arguments);
    client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 10);

    return result;
     
}

module.exports ={
    clearHash(hashKey){
        client.del(JSON.stringify(hashKey));
    }
}