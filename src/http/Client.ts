/**
 * @title: Client
 * @projectName frontend-framework-simulation
 * @description: TODO
 * @author zhangyunpeng0126
 * @date 2022/5/209:59
 */
import HttpTransmission, {Package} from './HttpTransmission'
import HttpTransFactory from "./HttpTransFactory";

enum ClientHttpStatus {
    SYN_SENT = 'SYN_SENT',
    INIT = "INIT",
    'FIN-WAIT-1' = 'FIN-WAIT-1',
    'FIN-WAIT-2' = 'FIN-WAIT-2'
}


class Client {
    constructor() {
        this.httpSender = HttpTransFactory.getHttpTrans()
        this.httpSender.client = this
    }

    private httpSender: HttpTransmission
    private httpStatus: ClientHttpStatus = ClientHttpStatus.INIT

    public shakeHandRequest(syn: Package) {
        if (this.httpStatus === ClientHttpStatus.INIT) {
            this.sendSyn(syn, () => {
                this.httpStatus = ClientHttpStatus.SYN_SENT
            })
        }
    }

    public waveRequest(syn: Package){
        if(this.httpStatus  === ClientHttpStatus.SYN_SENT){
            this.sendSyn(syn, () => {
                this.httpStatus = ClientHttpStatus['FIN-WAIT-1']
            })
        }
    }

    private sendSyn(syn: Package, onSuccess: () => void) {
        this.httpSend(syn)
        onSuccess && onSuccess()
    }

    private httpSend(_package: Package) {
        this.httpSender.send(_package)
    }

    public receive(_package: Package) {
        this.httpSend({ack: Number(_package.synNum) + 1})
    }

}

export default Client