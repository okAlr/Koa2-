class UserService {
    async createUser(user_name, password) {
        // 数据库操作
        return '写入数据库成功';
    }
}

module.exports = new UserService();