/**
 * @title: Server
 * @projectName frontend-framework-simulation
 * @description: TODO
 * @author zhangyunpeng0126
 * @date 2022/5/209:59
 */
import HttpTransmission, {Package} from './HttpTransmission'
import HttpTransFactory from "./HttpTransFactory";

enum ServerStatus {
    SYN_RECV = 'SYN_RECV',
    INIT = "INIT"
}

class Server {
    constructor() {
        this.httpSender = HttpTransFactory.getHttpTrans()
        this.httpSender.httpServer = this
    }

    private httpSender: HttpTransmission
    private httpStatus: ServerStatus = ServerStatus.INIT

    public receivePackage(_package: Package) {
        if (this.httpStatus === ServerStatus.INIT) {
            const pk: Package = {
                ack: _package.synNum as number + 1,
                synNum: 2
            }
            this.sendBack(pk, () => {
                this.httpStatus = ServerStatus.SYN_RECV
            })
        }
        if (this.httpStatus === ServerStatus.SYN_RECV) {

        }
    }

    private sendBack(_package: Package, onSuccess: () => void) {

        this.httpSender.sendBack(_package)
        onSuccess && onSuccess()
    }


}

export default Server