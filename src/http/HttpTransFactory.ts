/**
 * @title: HttpTransFactory
 * @projectName frontend-framework-simulation
 * @description: TODO
 * @author zhangyunpeng0126
 * @date 2022/5/2016:00
 */
import HttpTransmission from "./HttpTransmission";

class HttpTransFactory {

    public static httpTrans = new HttpTransmission()

    public static getHttpTrans() {
        return this.httpTrans
    }

}

export default HttpTransFactory