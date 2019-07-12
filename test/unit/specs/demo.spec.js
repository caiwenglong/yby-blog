// 导入 Vue.js 和组件，进行测试
import Vue from 'vue'
import chai from 'chai';
import sinon from 'sinon'
import { login } from '@/api/login'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
var expect = chai.expect
describe('UNIT TEST: GREENLIGHT', () => {
    var sandbox
    beforeEach(()=>{
        sandbox = sinon.createSandbox()
    })
    afterEach(()=>{
        sandbox.restore()
    })

    it('should always pass this canary test', function() {
        expect(true).to.eql(true)
    })

    it('should login successully with valid login form', function() {
        // 准备测试数据
        var myLogin = {login: login}
        var loginForm = {
            accountNo: "test3",
            password: "123456"
        }
        // 参数设置
        // this.timeout(10000)

        // stub异步返回结果
        var stub = sandbox.stub(myLogin, 'login')
        stub.withArgs(loginForm).resolves({'username': 'test3', webSourceList: ''})

        // Promise测试方法1： 使用原始done方法
        // 疑问：当断言失败时，未见断言失败报错，只看到超时报错
        // 猜测：因为断言失败，导致done方法未被执行
        // login(loginForm).then((res) => {
        //     expect(res).to.have.property('username2')  // 断言错误处
        //     expect(res).to.have.property('webSourceList')
        //     done()
        // })

        // Promise测试方法2： 返回Promise对象
        return myLogin.login(loginForm).then((res) => {
            expect(res).to.have.property('username')
            expect(res).to.have.property('webSourceList')
        })
    })
})