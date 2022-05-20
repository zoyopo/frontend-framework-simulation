/**
 * @title: HttpTransmission
 * @projectName frontend-framework-simulation
 * @description: TODO
 * @author zhangyunpeng0126
 * @date 2022/5/2010:48
 */
import Server from "./Server";
import Client from "./Client";

export interface Package {
    synNum?: number
    ack?: number
}

class HttpTransmission {

    public httpServer: Server
    public client: Client

    send(_package: Package) {
        this.httpServer.receivePackage(_package)
    }

    public sendBack(_package: Package) {
        this.client.receive(_package)
    }
}

export default HttpTransmission