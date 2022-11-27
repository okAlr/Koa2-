const Address = require('../model/addr.model');

class AddrService {
    async createAttr(addr) {
        return await Address.create(addr);
    }
}

module.exports = new AddrService();